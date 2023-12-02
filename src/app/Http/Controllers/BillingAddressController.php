<?php

namespace App\Http\Controllers;

use App\Http\Requests\BillingAddressSearchRequest;
use App\Models\BillingAddress;
use Inertia\Inertia;
use Inertia\Response;

class BillingAddressController extends Controller
{
    public function index(BillingAddressSearchRequest $request): Response
    {
        $keyword = $request->input('keyword');

        $billingAddresses = BillingAddress::query()
            ->searchByKeyword($keyword)
            ->latest();

        $billingAddressPaginator = $billingAddresses
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('BillingAddress/Index', [
            'billingAddressPaginator' => $billingAddressPaginator,
        ]);
    }
}
