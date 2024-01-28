<?php

namespace App\Http\Controllers;

use App\Http\Requests\BillingAddressSearchRequest;
use App\Http\Requests\BillingAddressStoreRequest;
use App\Http\Requests\BillingAddressUpdateRequest;
use App\Models\BillingAddress;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BillingAddressController extends Controller
{
    public function index(BillingAddressSearchRequest $request): Response
    {
        $billingAddresses = BillingAddress::query()
            ->searchByKeyword($request->input('keyword'))
            ->latest()
            ->paginate($request->input('page_size') ?? 100)
            ->withQueryString();

        return Inertia::render('BillingAddress/Index', [
            'billingAddresses' => $billingAddresses,
        ]);
    }

    public function show(BillingAddress $billingAddress): Response
    {
        return Inertia::render('BillingAddress/Show', [
            'billingAddress' => $billingAddress,
        ]);
    }


    public function edit(BillingAddress $billingAddress): Response
    {
        return Inertia::render('BillingAddress/Edit', [
            'billingAddress' => $billingAddress,
        ]);
    }

    public function update(BillingAddressUpdateRequest $request, BillingAddress $billingAddress): RedirectResponse
    {
        $billingAddress->update([
            'name'                      => $request->input('name'),
            'name_kana'                 => $request->input('name_kana'),
            'shortcut'                  => $request->input('shortcut'),
            'billing_contact_name'      => $request->input('billing_contact_name'),
            'postal_code'               => $request->input('postal_code'),
            'address'                   => $request->input('address'),
            'email'                     => $request->input('email'),
            'tel'                       => $request->input('tel'),
            'fax'                       => $request->input('fax'),
            'invoice_delivery_method'   => $request->input('invoice_delivery_method'),
            'note'                      => $request->input('note'),
        ]);

        return to_route('billing-addresses.index')
            ->with('message', "請求先No.{$billingAddress->id} を登録、紐付けました");
    }

    public function addToCustomer(BillingAddressStoreRequest $request, Customer $customer): RedirectResponse
    {
        $billingAddress = BillingAddress::create([
            'name'                    => $request->input('name'),
            'name_kana'               => $request->input('name_kana'),
            'shortcut'                => $request->input('shortcut'),
            'billing_contact_name'    => $request->input('billing_contact_name'),
            'postal_code'             => $request->input('postal_code'),
            'address'                 => $request->input('address'),
            'email'                   => $request->input('email'),
            'tel'                     => $request->input('tel'),
            'fax'                     => $request->input('fax'),
            'invoice_delivery_method' => $request->input('invoice_delivery_method'),
            'note'                    => $request->input('note'),
        ]);

        $customer->billingAddresses()->attach($billingAddress);

        return to_route('customers.show', $customer)
            ->with('message', "請求先No.{$billingAddress->id} を登録、紐付けました");
    }
}
