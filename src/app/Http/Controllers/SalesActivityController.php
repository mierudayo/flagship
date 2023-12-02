<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesActivityStoreRequest;
use App\Models\Customer;
use App\Models\SalesActivity;

class SalesActivityController extends Controller
{
    public function appendToCustomerContact(SalesActivityStoreRequest $request, Customer $customer)
    {
        $salesActivity = SalesActivity::create([
            'contact_date'          => $request->input('contact_date'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'proposal'              => $request->input('proposal'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'created_by_id'         => auth()->user()->id,
        ]);

        return to_route('customers.show', $customer)
        ->with('message', "ID:{$salesActivity->id} 営業履歴を追加しました。");
    }
}
