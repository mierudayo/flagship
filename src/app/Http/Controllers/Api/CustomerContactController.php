<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerContact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerContactController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $keyword = $request->input('keyword');

        $customers = CustomerContact::query()
            ->with(['customer'])
            ->searchByKeyword($keyword)
            ->latest()
            ->limit(50)
            ->get();

        return response()->json($customers);
    }
}
