<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerContactAddRequest;
use App\Http\Requests\CustomerContactSearchRequest;
use App\Http\Requests\CustomerContactStoreRequest;
use App\Http\Requests\CustomerContactUpdateRequest;
use App\Models\Customer;
use App\Models\CustomerContact;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CustomerContactController extends Controller
{
    public function index(CustomerContactSearchRequest $request): Response
    {
        $keyword    = $request->input('keyword', '');

        $contactQuery = CustomerContact::query()
                        ->with(['inChargeUser', 'customer'])
                        ->searchByKeyword($keyword)
                        ->latest();
        $contactsPaginator = $contactQuery->paginate(50)->withQueryString();

        return Inertia::render('CustomerContact/Index', [
            'contactsPaginator' => $contactsPaginator,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('CustomerContact/Create', [
            'customerSelectOptions' => Customer::all(),
            'userSelectOptions' => User::all(),
        ]);
    }

    public function show(CustomerContact $contact)
    {
        $contact->load(['customer', 'inChargeUser', 'createdBy', 'updatedBy']);

        return Inertia::render('CustomerContact/Show', [
            'contact' => array_merge($contact->toArray(), [
                'created_at' => $contact->created_at->format('Y-m-d H:i'),
                'updated_at' => $contact->updated_at->format('Y-m-d H:i'),
            ]),
        ]);
    }

    public function store(CustomerContactStoreRequest $request): RedirectResponse
    {
        $contact = CustomerContact::create([
            'customer_id'   => $request->input('customer_id'),
            'name'          => $request->input('name'),
            'name_kana'     => $request->input('name_kana'),
            'tel'           => $request->input('tel'),
            'mobile_number' => $request->input('mobile_number'),
            'email'         => $request->input('email'),
            'position'      => $request->input('position'),
            'role'          => $request->input('role'),
            'is_active'     => $request->input('is_active'),
            'note'          => $request->input('note'),
            'in_charge_user_id' => $request->input('in_charge_user_id'),
            'created_by_id' => auth()->user()->id,
        ]);

        return to_route('contacts.index')->with('message', "ID:{$contact->id} 連絡先を追加しました。");
    }

    public function edit(CustomerContact $contact): Response
    {
        return Inertia::render('CustomerContact/Edit', [
            'contact'   => $contact,
            'customerSelectOptions' => Customer::all(),
            'userSelectOptions' => User::all(),
        ]);
    }

    public function update(CustomerContactUpdateRequest $request, CustomerContact $contact): RedirectResponse
    {
        $contact->update([
            'customer_id'   => $request->input('customer_id'),
            'name'          => $request->input('name'),
            'name_kana'     => $request->input('name_kana'),
            'tel'           => $request->input('tel'),
            'mobile_number' => $request->input('mobile_number'),
            'email'         => $request->input('email'),
            'position'      => $request->input('position'),
            'role'          => $request->input('role'),
            'is_active'     => $request->input('is_active'),
            'note'          => $request->input('note'),
            'in_charge_user_id' => $request->input('in_charge_user_id'),
            'updated_by_id' => auth()->user()->id,
        ]);

        return to_route('contacts.index')->with('message', "ID:{$contact->id} 連絡先を更新しました。");
    }

    public function addContactToCustomer(CustomerContactAddRequest $request, Customer $customer): RedirectResponse
    {
        $contact = CustomerContact::create([
            'customer_id'   => $customer->id,
            'name'          => $request->input('name'),
            'name_kana'     => $request->input('name_kana'),
            'tel'           => $request->input('tel'),
            'mobile_number' => $request->input('mobile_number'),
            'email'         => $request->input('email'),
            'position'      => $request->input('position'),
            'role'          => $request->input('role'),
            'is_active'     => $request->input('is_active'),
            'note'          => $request->input('note'),
            'in_charge_user_id' => $request->input('in_charge_user_id'),
            'created_by_id' => auth()->user()->id,
        ]);

        return to_route('customers.show', $customer)
                ->with('message', "ID:{$contact->id} 連絡先を追加しました。");
    }

    public function destroy(CustomerContact $contact): RedirectResponse
    {
        // TODO: リレーション先追加後に存在チェック追加
        $contact->delete();
        return to_route('contacts.index');
    }
}
