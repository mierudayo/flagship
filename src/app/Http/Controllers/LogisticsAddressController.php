<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogisticsAddressAddRequest;
use App\Models\Customer;
use App\Models\LogisticsAddress;
use Illuminate\Http\RedirectResponse;

class LogisticsAddressController extends Controller
{
    public function addLogisticsAddressToCustomer(LogisticsAddressAddRequest $request, Customer $customer): RedirectResponse
    {
        $logistictAddress = LogisticsAddress::create([
            'customer_id'   => $customer->id,
            'address_type'  => $request->input('address_type'),
            'post_code'     => $request->input('post_code'),
            'address'       => $request->input('address'),
            'company_name'  => $request->input('company_name'),
            'contact_name'  => $request->input('contact_name'),
            'tel'           => $request->input('tel'),
            'note'          => $request->input('note'),
        ]);

        return to_route('customers.show', $customer)
        ->with('message', "ID:{$logistictAddress->id} 出荷元/納品先を追加しました。");
    }
}
