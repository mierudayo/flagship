<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeliveryAddressAddRequest;
use App\Models\Customer;
use App\Models\DeliveryAddress;
use Illuminate\Http\RedirectResponse;

class DeliveryAddressController extends Controller
{
    public function addDeliveryAddressToCustomer(DeliveryAddressAddRequest $request, Customer $customer): RedirectResponse
    {
        $deliveryAddress = DeliveryAddress::create([
            'customer_id'   => $customer->id,
            'address_type'  => $request->input('address_type'),
            'postal_code'   => $request->input('postal_code'),
            'address'       => $request->input('address'),
            'company_name'  => $request->input('company_name'),
            'contact_name'  => $request->input('contact_name'),
            'tel'           => $request->input('tel'),
            'note'          => $request->input('note'),
        ]);

        return to_route('customers.show', $customer)
            ->with('message', "ID:{$deliveryAddress->id} 出荷元/納品先を追加しました。");
    }
}
