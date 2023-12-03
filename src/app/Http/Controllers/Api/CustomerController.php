<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $keyword = $request->input('keyword');

        $customers = Customer::query()
            ->with([
                'contacts',
                'deliveryAddresses',
            ])
            ->searchByKeyword($keyword)
            ->latest()
            ->limit(50)
            ->get();

        return response()->json($customers);
    }
}
