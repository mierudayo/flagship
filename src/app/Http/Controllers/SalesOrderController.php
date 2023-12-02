<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesOrderSearchRequest;
use App\Models\SalesOrder;
use Inertia\Inertia;
use Inertia\Response;

class SalesOrderController extends Controller
{
    public function index(SalesOrderSearchRequest $request): Response
    {
        $keyword = $request->input('keyword');

        $salesOrdersQuery = SalesOrder::query()
            ->with([
                'customer',
                'salesInCharge',
                'productCategory',
            ])
            ->searchByKeyword($keyword)
            ->latest();

        $salesOrdersPaginator = $salesOrdersQuery->paginate(100)->withQueryString();

        return Inertia::render('SalesOrder/Index', [
            'salesOrdersPaginator' => $salesOrdersPaginator,
        ]);
    }
}
