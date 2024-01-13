<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BillingAddress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BillingAddressController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $billingAddresses = BillingAddress::query()
            ->searchByKeyword($request->input('keyword'))
            ->latest()
            ->limit(50)
            ->get();

        return response()->json($billingAddresses);
    }
}
