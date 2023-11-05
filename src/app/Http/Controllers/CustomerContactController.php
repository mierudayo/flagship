<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerContactStoreRequest;
use App\Models\Customer;
use App\Models\CustomerContact;
use Illuminate\Http\RedirectResponse;

class CustomerContactController extends Controller
{
    public function store(CustomerContactStoreRequest $request, Customer $customer): RedirectResponse
    {
        $contact = CustomerContact::create([
            'customer_id'   => $customer->id,
            'name'          => $request->input('name'),
            'name_kana'     => $request->input('name_kana'),
            'tel_number'    => $request->input('tel_number'),
            'mobile_number' => $request->input('mobile_number'),
            'email'         => $request->input('email'),
            'position'      => $request->input('position'),
            'role'          => $request->input('role'),
            'is_active'     => $request->input('is_active'),
            'note'          => $request->input('note'),
            'created_by_id' => auth()->user()->id,
        ]);

        return to_route('customers.show', $customer)
                ->with('message', "ID:{$contact->id} 連絡先を追加しました。");
    }
}
