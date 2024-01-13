<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerSearchRequest;
use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Models\Customer;
use App\Models\CustomerContact;
use App\Models\DeliveryAddress;
use App\Models\LeadSource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(CustomerSearchRequest $request): Response
    {
        $customers = Customer::query()
            ->with(['inChargeUser'])
            ->searchByKeyword($request->input('keyword'))
            ->searchById($request->input('customer_id'))
            ->searchByAddress($request->input('address'))
            ->searchByPhone($request->input('phone'))
            ->searchByInCharge($request->input('in_charge_user_id'))
            ->searchByDeliveryAddress($request->input('delivery_address'))
            ->latest()
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('Customer/Index', [
            'customers'             => $customers,
            'inChargeUserOptions'   => User::hasCustomers()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Customer/Create', [
            'userOptions'       => User::active()->get(),
            'leadSourceOptions' => LeadSource::all(),
        ]);
    }

    public function store(CustomerStoreRequest $request): RedirectResponse
    {
        $customer = DB::transaction(function () use ($request) {
            $createdCustomer = $this->createCustomer($request);
            $this->createPurchaseTerm($createdCustomer, $request->input('purchase_term'));
            $this->createSalesTerm($createdCustomer, $request->input('sales_term'));
            $this->createContacts($createdCustomer->id, $request->input('contacts'));
            $this->createDeliveryAddresses($createdCustomer->id, $request->input('delivery_addresses'));
            return $createdCustomer;
        });

        return to_route('customers.show', $customer)
            ->with('message', "取引先ID:{$customer->id} 登録成功しました。");
    }

    public function show(Customer $customer): Response
    {
        $customer->load([
            'contacts.inChargeUser',
            'inChargeUser',
            'createdBy',
            'updatedBy',
            'deliveryAddresses',
            'purchaseTerm',
            'salesTerm',
            'contacts.salesActivities.inChargeUser',
            'contacts.leadSource',
            'billingAddresses',
        ]);

        return Inertia::render('Customer/Show', [
            'customer'          => $customer,
            'userOptions'       => User::active()->get(),
            'leadSourceOptions' => LeadSource::all(),
        ]);
    }

    public function edit(Customer $customer): Response
    {
        $customer->load([
            'purchaseTerm',
            'salesTerm',
            'contacts',
            'deliveryAddresses',
            'createdBy',
            'updatedBy'
        ]);

        return Inertia::render('Customer/Edit', [
            'customer'          => $customer,
            'userOptions'       => User::active()->get(),
            'leadSourceOptions' => LeadSource::all(),
        ]);
    }

    public function update(CustomerUpdateRequest $request, Customer $customer): RedirectResponse
    {
        DB::transaction(function () use ($request, &$customer) {
            $this->updateCustomer($request, $customer);
            $this->updateOrCreatePurchaseTerm($customer, $request->input('purchase_term'));
            $this->updateOrCreateSalesTerm($customer, $request->input('sales_term'));
            $this->upsertContacts($customer->id, $request->input('contacts'));
            $this->upsertDeliveryAddresses($customer->id, $request->input('delivery_addresses'));
        });

        return to_route('customers.show', $customer)
            ->with('message', "取引先情報を更新しました。");
    }

    public function destroy(Customer $customer): RedirectResponse
    {
        if (!$customer->canDelete()) {
            return redirect()
                ->route('customers.edit', $customer)
                ->with(['type' => 'danger', 'message' => 'この取引先は関連データを持つため削除できません。']);
        }

        $customer->delete();
        return to_route('customers.index');
    }

    public function attachBillingAddress(Customer $customer, Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'billing_address_id' => 'required|integer|exists:billing_addresses,id'
        ]);

        $billingAddressId = $validatedData['billing_address_id'];

        if($customer->hasBillingAddress($billingAddressId)) {
            return to_route('customers.show', $customer)
                ->with(['type' => 'danger', 'message' => "請求先No.{$billingAddressId} はすでに紐付けされています"]);
        }

        $customer->billingAddresses()->attach($billingAddressId);

        return to_route('customers.show', $customer)
            ->with('message', "請求先No.{$billingAddressId} を紐付けしました。");
    }

    public function detachBillingAddress(Customer $customer, Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'billing_address_id' => 'required|integer|exists:billing_addresses,id'
        ]);

        $billingAddressId = $validatedData['billing_address_id'];

        if (!$customer->hasBillingAddress($billingAddressId)) {
            return to_route('customers.show', $customer)
                ->with(['type' => 'danger', 'message' => "請求先No.{$billingAddressId} は紐付けられていません"]);
        }

        $customer->billingAddresses()->detach($billingAddressId);

        return to_route('customers.show', $customer)
            ->with('message', "請求先No.{$billingAddressId} の紐付けを解除しました。");
    }

    /*
    |--------------------------------------------------------------------------
    | Business Logic
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


    private function createPurchaseTerm(Customer $customer, ?array $purchaseTerms): void
    {
        if (!$purchaseTerms) {
            return;
        }

        $customer->purchaseTerm()->create($purchaseTerms);
    }

    private function updateOrCreatePurchaseTerm(Customer $customer, ?array $purchaseTerms): void
    {
        if (!$purchaseTerms) {
            return;
        }

        $customer->purchaseTerm()->updateOrCreate(
            ['customer_id' => $customer->id],
            [
                'billing_type'          => $purchaseTerms['billing_type'] ?? null,
                'cutoff_day'            => $purchaseTerms['cutoff_day'] ?? null,
                'payment_month_offset'  => $purchaseTerms['payment_month_offset'] ?? null,
                'payment_day'           => $purchaseTerms['payment_day'] ?? null,
                'payment_day_offset'    => $purchaseTerms['payment_day_offset'] ?? null,
            ],
        );
    }

    private function createSalesTerm(Customer $customer, ?array $salesTerms): void
    {
        if (!$salesTerms) {
            return;
        }

        $customer->salesTerm()->create($salesTerms);
    }

    private function updateOrCreateSalesTerm(Customer $customer, ?array $salesTerms): void
    {
        if (!$salesTerms) {
            return;
        }

        $customer->salesTerm()->updateOrCreate(
            ['customer_id' => $customer->id],
            [
                'billing_type'          => $salesTerms['billing_type'] ?? null,
                'cutoff_day'            => $salesTerms['cutoff_day'] ?? null,
                'payment_month_offset'  => $salesTerms['payment_month_offset'] ?? null,
                'payment_day'           => $salesTerms['payment_day'] ?? null,
                'payment_day_offset'    => $salesTerms['payment_day_offset'] ?? null,
            ],
        );
    }

    private function createContacts(string $customerId, ?array $contacts): void
    {
        if (!$contacts) {
            return;
        }

        $contacts = collect($contacts)->map(function ($contact) use ($customerId) {
            return  [
                'customer_id'       => $customerId,
                'lead_source_id'    => $contact['lead_source_id'] ?? null,
                'name'              => $contact['name'] ?? null,
                'name_kana'         => $contact['name_kana'] ?? null,
                'tel'               => $contact['tel'] ?? null,
                'mobile_number'     => $contact['mobile_number'] ?? null,
                'email'             => $contact['email'] ?? null,
                'position'          => $contact['position'] ?? null,
                'role'              => $contact['role'] ?? null,
                'is_active'         => $contact['is_active'] ?? null,
                'note'              => $contact['note'] ?? null,
                'in_charge_user_id' => $contact['in_charge_user_id'] ?? null,
                'created_by_id'     => auth()->user()->id,
                'created_at'        => now(),
            ];
        })->toArray();

        CustomerContact::insert($contacts);
    }


    private function upsertContacts(string $customerId, ?array $contacts): void
    {
        if (!$contacts) {
            return;
        }

        $contacts = collect($contacts)->map(function ($contact) use ($customerId) {
            return  [
                'id'                => $contact['id'] ?? null,
                'customer_id'       => $customerId,
                'lead_source_id'    => $contact['lead_source_id'] ?? null,
                'name'              => $contact['name'] ?? null,
                'name_kana'         => $contact['name_kana'] ?? null,
                'tel'               => $contact['tel'] ?? null,
                'mobile_number'     => $contact['mobile_number'] ?? null,
                'email'             => $contact['email'] ?? null,
                'position'          => $contact['position'] ?? null,
                'role'              => $contact['role'] ?? null,
                'is_active'         => $contact['is_active'] ?? null,
                'note'              => $contact['note'] ?? null,
                'in_charge_user_id' => $contact['in_charge_user_id'] ?? null,
                'created_by_id'     => $contact['created_by_id'] ?? auth()->user()->id,
                'updated_by_id'     => auth()->user()->id,
                'created_at'        => $contact['created_at'] ?? now(),
                'updated_at'        => now(),
            ];
        })->toArray();

        CustomerContact::upsert($contacts, ['id']);
    }

    private function createDeliveryAddresses(string $customerId, ?array $deliveryAddresses): void
    {
        if (!$deliveryAddresses) {
            return;
        }

        $deliveryAddresses = collect($deliveryAddresses)
            ->map(function ($deliveryAddress) use ($customerId) {
                return [
                    'customer_id'   => $customerId,
                    'address_type'  => $deliveryAddress['address_type'],
                    'postal_code'   => $deliveryAddress['postal_code'] ?? null,
                    'address'       => $deliveryAddress['address'],
                    'company_name'  => $deliveryAddress['company_name'] ?? null,
                    'contact_name'  => $deliveryAddress['contact_name'] ?? null,
                    'tel'           => $deliveryAddress['tel'] ?? null,
                    'note'          => $deliveryAddress['note'] ?? null,
                    'created_at'    => now(),
                ];
            })->toArray();

        DeliveryAddress::insert($deliveryAddresses);
    }

    private function upsertDeliveryAddresses(string $customerId, ?array $deliveryAddresses): void
    {
        if (!$deliveryAddresses) {
            return;
        }

        $deliveryAddresses = collect($deliveryAddresses)
            ->map(function ($deliveryAddress) use ($customerId) {
                return [
                    'id'            => $deliveryAddress['id'] ?? null,
                    'customer_id'   => $customerId,
                    'address_type'  => $deliveryAddress['address_type'],
                    'postal_code'   => $deliveryAddress['postal_code'] ?? null,
                    'address'       => $deliveryAddress['address'],
                    'company_name'  => $deliveryAddress['company_name'] ?? null,
                    'contact_name'  => $deliveryAddress['contact_name'] ?? null,
                    'tel'           => $deliveryAddress['tel'] ?? null,
                    'note'          => $deliveryAddress['note'] ?? null,
                    'created_at'    => $deliveryAddress['created_at'] ?? now(),
                    'updated_at'    => now(),
                ];
            })->toArray();

        DeliveryAddress::upsert($deliveryAddresses, ['id']);
    }
}
