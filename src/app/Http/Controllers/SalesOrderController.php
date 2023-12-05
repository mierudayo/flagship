<?php

namespace App\Http\Controllers;

use App\Enums\PaymentTerm\BillingType;
use App\Enums\PaymentTerm\CutoffDay;
use App\Enums\PaymentTerm\PaymentDay;
use App\Enums\PaymentTerm\PaymentDayOffset;
use App\Enums\PaymentTerm\PaymentMonthOffset;
use App\Http\Requests\SalesOrderSearchRequest;
use App\Http\Requests\SalesOrderStoreRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\SalesOrder;
use App\Models\SalesOrderDetail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
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
                'salesOrderDetails',
            ])
            ->searchByKeyword($keyword)
            ->latest();

        $salesOrdersPaginator = $salesOrdersQuery->paginate(100)->withQueryString();

        return Inertia::render('SalesOrder/Index', [
            'salesOrdersPaginator' => $salesOrdersPaginator,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('SalesOrder/Create', [
            'userOptions'            => User::active()->get(),
            'productOptions'         => Product::all(),
            'productCategoryOptions' => ProductCategory::all(),
            'paymentTerms'           => $this->getPaymentTerms(),
        ]);
    }

    public function store(SalesOrderStoreRequest $request): RedirectResponse
    {
        // TODO: トランザクションにまとめて登録処理
        $salesOrder = SalesOrder::create([
            'customer_id'           => $request->input('customer_id'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'billing_address_id'    => $request->input('billing_address_id'),
            'delivery_address_id'   => $request->input('delivery_address_id'),
            'product_category_id'   => $request->input('product_category_id'),
            'billing_type'          => $request->input('billing_type'),
            'cutoff_day'            => $request->input('cutoff_day'),
            'payment_month_offset'  => $request->input('payment_month_offset'),
            'payment_day'           => $request->input('payment_day'),
            'payment_day_offset'    => $request->input('payment_day_offset'),
            'payment_date'          => $request->input('payment_date'),
            'payment_status'        => $request->input('payment_status'),
            'customer_name'         => $request->input('customer_name'),
            'delivery_address'      => $request->input('delivery_address'),
            'order_date'            => $request->input('order_date'),
            'shipping_date'         => $request->input('shipping_date'),
            'shipping_status'       => $request->input('shipping_status'),
            'delivery_date'         => $request->input('delivery_date'),
            'delivery_status'       => $request->input('delivery_status'),
            'delivery_memo'         => $request->input('delivery_memo'),
            'total_amount'          => 0, // TODO: 計算ロジック追加
            'note'                  => $request->input('note'),
            'sales_in_charge_id'    => $request->input('sales_in_charge_id'),
            'created_by_id'         => auth()->user()->id,
        ]);

        // TODO: refactor 後でメソッド化,
        $salesOrderDetails = collect($request->input('sales_order_details'))
            ->map(function ($detail) use ($salesOrder) {

                // TODO: 計算をメソッド化
                $quantity = $detail['quantity'];
                $unitPrice = $detail['unit_price'];
                $taxRate = $detail['tax_rate'];
                $isTaxInclusive = $detail['is_tax_inclusive'];

                $basicSubtotal = $quantity * $unitPrice;

                if ($isTaxInclusive) {
                    $subtotal  = $basicSubtotal / (1 + $taxRate);
                    $taxAmount = $basicSubtotal - $subtotal;
                    $total     = $basicSubtotal;
                } else {
                    $subtotal   = $basicSubtotal;
                    $taxAmount  = $subtotal * $taxRate;
                    $total      = $subtotal + $taxAmount;
                }

                return [
                    'sales_order_id'    => $salesOrder->id,
                    'product_id'        => $detail['product_id'],
                    'product_name'      => $detail['product_name'],
                    'product_detail'    => $detail['product_detail'],
                    'quantity'          => $detail['quantity'],
                    'unit_price'        => $detail['unit_price'],
                    'tax_rate'          => $detail['tax_rate'],
                    'is_tax_inclusive'  => $isTaxInclusive,
                    'tax_amount'        => $taxAmount,
                    'subtotal'          => $subtotal,
                    'total'             => $total,
                    'note'              => $detail['note'],
                ];
            })->toArray();

        SalesOrderDetail::insert($salesOrderDetails);

        return to_route('sales-orders.index')
            ->with('message', "受注ID:{$salesOrder->id} 登録成功しました。");
    }

    private function getPaymentTerms(): array
    {
        return [
            'billingTypes' => BillingType::toArray(),
            'cutoffDays'   => CutoffDay::toArray(),
            'monthOffsets' => PaymentMonthOffset::toArray(),
            'paymentDay'   => PaymentDay::toArray(),
            'dayOffsets'   => PaymentDayOffset::toArray(),
        ];
    }
}
