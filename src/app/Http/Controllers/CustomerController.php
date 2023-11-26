<?php

namespace App\Http\Controllers;

use App\Enums\DeliveryAddressType;
use App\Enums\PaymentTerm\BillingType;
use App\Enums\PaymentTerm\CutoffDay;
use App\Enums\PaymentTerm\PaymentDay;
use App\Enums\PaymentTerm\PaymentDayOffset;
use App\Enums\PaymentTerm\PaymentMonthOffset;
use App\Http\Requests\CustomerSearchRequest;
use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Models\Customer;
use App\Models\CustomerContact;
use App\Models\PurchaseTerm;
use App\Models\SalesTerm;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(CustomerSearchRequest $request): Response
    {
        $keyword    = $request->input('keyword', '');

        $customerQuery = Customer::query()
            ->with(['inChargeUser', 'contacts'])
            ->searchByKeyword($keyword)
            ->latest();
        $customersPaginator = $customerQuery->paginate(50)->withQueryString();

        return Inertia::render('Customer/Index', [
            'customersPaginator' => $customersPaginator,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Customer/Create', [
            'userSelectOptions' => User::all(),
            'paymentTerms'      => $this->getPaymentTerms(),
        ]);
    }

    public function store(CustomerStoreRequest $request): RedirectResponse
    {
        $customer = DB::transaction(function () use ($request) {
            $createdCustomer = $this->createCustomer($request);
            $this->createPurchaseTermIfNeeded($request, $createdCustomer);
            $this->createSalesTermIfNeeded($request, $createdCustomer);
            $this->createContacts($request, $createdCustomer);
            return $createdCustomer;
        });

        return to_route('customers.show', $customer)
            ->with('message', "取引先ID:{$customer->id} 登録成功しました。");
    }

    public function show(Customer $customer): Response
    {
        $customer->load(['contacts.inChargeUser', 'inChargeUser', 'createdBy', 'updatedBy', 'deliveryAddresses', 'purchaseTerm', 'salesTerm']);

        return Inertia::render('Customer/Show', [
            'customer' => array_merge($customer->toArray(), [
                'created_at' => $customer->created_at->format('Y-m-d H:i'),
                'updated_at' => $customer->updated_at->format('Y-m-d H:i'),
            ]),
            'userSelectOptions' => User::all(),
            'deliveryAddressTypes' => DeliveryAddressType::toArray(),
        ]);
    }

    public function edit(Customer $customer): Response
    {
        $customer->load(['purchaseTerm', 'salesTerm', 'contacts']);
        return Inertia::render('Customer/Edit', [
            'customer' => $customer,
            'userSelectOptions' => User::all(),
            'paymentTerms'      => $this->getPaymentTerms(),
        ]);
    }

    public function update(CustomerUpdateRequest $request, Customer $customer): RedirectResponse
    {
        DB::transaction(function () use ($request, &$customer) {
            $this->updateCustomer($request, $customer);
            $this->updateOrCreatePurchaseTermIfNeeded($request, $customer);
            $this->updateOrCreateSalesTermIfNeeded($request, $customer);
            $this->upsertContacts($request, $customer);
        });

        return to_route('customers.show', $customer)
            ->with('message', "取引先情報を更新しました。");
    }

    public function destroy(Customer $customer): RedirectResponse
    {
        if ($customer->contacts()->exists()) {
            return redirect()
                ->route('customers.edit', $customer)
                ->with('message', 'この取引先は連絡先データを持つため削除できません。');
        }

        $customer->delete();
        return to_route('customers.index');
    }

    /*
    |--------------------------------------------------------------------------
    | Utility
    |--------------------------------------------------------------------------
    */
    private function createCustomer(CustomerStoreRequest $request): Customer
    {
        $createdCustomer = Customer::create([
            'name'              => $request->input('name'),
            'name_kana'         => $request->input('name_kana'),
            'shortcut'          => $request->input('shortcut'),
            'postal_code'       => $request->input('postal_code'),
            'address'           => $request->input('address'),
            'tel'               => $request->input('tel'),
            'fax'               => $request->input('fax'),
            'note'              => $request->input('note'),
            'in_charge_user_id' => $request->input('in_charge_user_id'),
            'created_by_id'     => auth()->user()->id,
        ]);

        return $createdCustomer;
    }

    private function createPurchaseTermIfNeeded(CustomerStoreRequest $request, Customer $customer): void
    {
        if ($request->input('purchase_billing_type') === null) {
            return;
        }

        PurchaseTerm::create([
            'customer_id'           => $customer->id,
            'billing_type'          => $request->input('purchase_billing_type'),
            'cutoff_day'            => $request->input('purchase_cutoff_day'),
            'payment_month_offset'  => $request->input('purchase_payment_month_offset'),
            'payment_day'           => $request->input('purchase_payment_day'),
            'payment_day_offset'    => $request->input('purchase_payment_day_offset'),
        ]);
    }

    private function createSalesTermIfNeeded(CustomerStoreRequest $request, Customer $customer): void
    {
        if ($request->input('sales_billing_type') === null) {
            return;
        }

        SalesTerm::create([
            'customer_id'           => $customer->id,
            'billing_type'          => $request->input('sales_billing_type'),
            'cutoff_day'            => $request->input('sales_cutoff_day'),
            'payment_month_offset'  => $request->input('sales_payment_month_offset'),
            'payment_day'           => $request->input('sales_payment_day'),
            'payment_day_offset'    => $request->input('sales_payment_day_offset'),
        ]);
    }

    private function updateCustomer(CustomerUpdateRequest $request, Customer $customer): void
    {
        $customer->update([
            'name'              => $request->input('name'),
            'name_kana'         => $request->input('name_kana'),
            'shortcut'          => $request->input('shortcut'),
            'postal_code'       => $request->input('postal_code'),
            'address'           => $request->input('address'),
            'tel'               => $request->input('tel'),
            'fax'               => $request->input('fax'),
            'note'              => $request->input('note'),
            'in_charge_user_id' => $request->input('in_charge_user_id'),
            'updated_by_id'     => auth()->user()->id,
        ]);
    }

    private function updateOrCreatePurchaseTermIfNeeded(CustomerUpdateRequest $request, Customer $customer): void
    {
        if ($request->input('purchase_billing_type') === null) {
            return;
        }

        PurchaseTerm::updateOrCreate(
            ['customer_id' => $customer->id],
            [
                'billing_type'          => $request->input('purchase_billing_type'),
                'cutoff_day'            => $request->input('purchase_cutoff_day'),
                'payment_month_offset'  => $request->input('purchase_payment_month_offset'),
                'payment_day'           => $request->input('purchase_payment_day'),
                'payment_day_offset'    => $request->input('purchase_payment_day_offset'),
            ],
        );
    }

    private function updateOrCreateSalesTermIfNeeded(CustomerUpdateRequest $request, Customer $customer): void
    {
        if ($request->input('sales_billing_type') === null) {
            return;
        }

        SalesTerm::updateOrCreate(
            ['customer_id' => $customer->id],
            [
                'billing_type'          => $request->input('sales_billing_type'),
                'cutoff_day'            => $request->input('sales_cutoff_day'),
                'payment_month_offset'  => $request->input('sales_payment_month_offset'),
                'payment_day'           => $request->input('sales_payment_day'),
                'payment_day_offset'    => $request->input('sales_payment_day_offset'),
            ],
        );
    }

    private function createContacts(CustomerStoreRequest $request, Customer $customer): void
    {
        $contacts = $this->prepareContactsData($request->input('contacts'), $customer);
        CustomerContact::insert($contacts);
    }

    /**
     * リクエストから受け取ったcontactsデータを、
     * customer_contactsテーブル用のデータとして整形する。
     *
     * @param array $contacts リクエストから受け取った連絡先データ
     * @param Customer $customer 連絡先に関連付ける取引先インスタンス
     * @return array 整形された連絡先データ
     */
    private function prepareContactsData(array $contacts, Customer $customer): array
    {
        $customerId  = $customer->id;
        $createdById = auth()->user()->id;

        return collect($contacts)->map(function ($contact) use ($customerId, $createdById) {
            return array_merge($contact, [
                'customer_id'   => $customerId,
                'created_by_id' => $createdById,
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);
        })->toArray();
    }

    private function upsertContacts(CustomerUpdateRequest $request, Customer $customer): void
    {
        $contacts = $this->prepareUpdateContactsData($request->input('contacts'), $customer);
        CustomerContact::upsert($contacts, ['id']);
    }

    /**
     * リクエストから受け取ったcontactsデータを、
     * customer_contactsテーブル用に既存データ更新と新規追加のデータとして整形する。
     *
     * @param array $contacts リクエストから受け取った連絡先データ
     * @param Customer $customer 連絡先に関連付ける取引先インスタンス
     * @return array 整形された連絡先データ
     */
    private function prepareUpdateContactsData(array $contacts, Customer $customer): array
    {
        $updatedById = auth()->user()->id;
        $customerId  = $customer->id;

        return collect($contacts)
            ->map(function ($contact) use ($customerId, $updatedById) {
                return [
                    'id'                => $contact['id'] ?? null,
                    'customer_id'       => $customerId,
                    'name'              => $contact['name'],
                    'name_kana'         => $contact['name_kana'],
                    'tel'               => $contact['tel'],
                    'mobile_number'     => $contact['mobile_number'],
                    'email'             => $contact['email'],
                    'position'          => $contact['position'],
                    'role'              => $contact['role'],
                    'is_active'         => $contact['is_active'],
                    'note'              => $contact['note'],
                    'in_charge_user_id' => $contact['in_charge_user_id'],
                    'created_by_id'     => $contact['created_by_id'] ?? $updatedById,
                    'updated_by_id'     => $updatedById,
                ];
            })->toArray();
    }

    private function getPaymentTerms(): array
    {
        return [
            'billingTypes' => BillingType::toArray(),
            'cutoffDays'   => CutoffDay::toArray(),
            'monthOffsets' => PaymentMonthOffset::toArray(),
            'paymentDay'   => PaymentDay::toArray(),
            'dayOffsets'   => PaymentDayOffset::toArray(),
        ];
    }
}
