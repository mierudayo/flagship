<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseOrderSearchRequest;
use App\Models\PurchaseOrder;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseOrderController extends Controller
{
    public function index(PurchaseOrderSearchRequest $request): Response
    {
        $keyword = $request->input('keyword');

        $purchaseOrders = PurchaseOrder::query()
            ->with([
                'customer',
                'purchaseInCharge',
                'productCategory',
                'purchaseOrderDetails',
            ])
            ->searchByKeyword($keyword)
            ->latest()
            ->paginate(100)
            ->withQueryString();

        return Inertia::render('PurchaseOrder/Index', [
            'purchaseOrders' => $purchaseOrders,
        ]);
    }
}
