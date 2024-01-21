<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseOrderSearchRequest;
use App\Http\Requests\PurchaseOrderStoreRequest;
use App\Models\DeliveryAddress;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseOrderController extends Controller
{
    public function index(PurchaseOrderSearchRequest $request): Response
    {
        $purchaseOrders = PurchaseOrder::query()
            ->with([
                'customer',
                'purchaseInCharge',
                'productCategory',
                'purchaseOrderDetails',
            ])
            ->searchByKeyword($request->input('keyword'))
            ->searchByPurchasePeriod(
                $request->input('start_date'),
                $request->input('end_date')
            )
            ->searchByProductCategory($request->input('product_category_id'))
            ->searchByProductName($request->input('product_name'))
            ->searchByProductDetail($request->input('product_detail'))
            ->searchByCustomerName($request->input('customer_name'))
            ->searchByPurchaseInCharge($request->input('purchase_in_charge_id'))
            ->searchByShipFrom($request->input('ship_from'))
            ->latest()
            ->paginate(100)
            ->withQueryString();

        return Inertia::render('PurchaseOrder/Index', [
            'purchaseOrders'         => $purchaseOrders,
            'userOptions'            => User::all(),
            'productCategoryOptions' => ProductCategory::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('PurchaseOrder/Create', [
            'userOptions'            => User::active()->get(),
            'productOptions'         => Product::all(),
            'productCategoryOptions' => ProductCategory::all(),
        ]);
    }

    public function store(PurchaseOrderStoreRequest $request): RedirectResponse
    {
        $deliveryAddress = DeliveryAddress::find($request->input('delivery_address_id'));

        // TODO: トランザクションにまとめて登録処理
        $purchaseOrder = PurchaseOrder::create([
            'customer_id'           => $request->input('customer_id'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'delivery_address_id'   => $deliveryAddress->id ?? null,
            'product_category_id'   => $request->input('product_category_id'),
            'billing_type'          => $request->input('billing_type'),
            'cutoff_day'            => $request->input('cutoff_day'),
            'payment_month_offset'  => $request->input('payment_month_offset'),
            'payment_day'           => $request->input('payment_day'),
            'payment_day_offset'    => $request->input('payment_day_offset'),
            'payment_date'          => $request->input('payment_date'),
            'payment_status'        => $request->input('payment_status'),
            'ship_from_address'     => $deliveryAddress->address ?? null,
            'ship_from_company'     => $deliveryAddress->company_name ?? null,
            'ship_from_contact'     => $deliveryAddress->contact_name ?? null,
            'purchase_date'         => $request->input('purchase_date'),
            'note'                  => $request->input('note'),
            'purchase_in_charge_id' => $request->input('purchase_in_charge_id'),
            'created_by_id'         => auth()->user()->id,
        ]);

        // TODO: refactor 後でメソッド化,
        $purchaseOrderDetails = collect($request->input('purchase_order_details'))
            ->map(function ($detail, $index) use ($purchaseOrder) {
                return [
                    'purchase_order_id' => $purchaseOrder->id,
                    'row_number'        => $index + 1,
                    'product_id'        => $detail['product_id'] ?? null,
                    'product_name'      => $detail['product_name'] ?? null,
                    'product_detail'    => $detail['product_detail'] ?? null,
                    'quantity'          => $detail['quantity'],
                    'unit_price'        => $detail['unit_price'],
                    'tax_rate'          => $detail['tax_rate'],
                    'note'              => $detail['note'] ?? null,
                ];
            })->toArray();

        PurchaseOrderDetail::insert($purchaseOrderDetails);

        return to_route('purchase-orders.index')
            ->with('message', "発注No:{$purchaseOrder->id} 登録成功しました。");
    }

    public function show(PurchaseOrder $purchaseOrder): Response
    {
        $purchaseOrder->load([
            'customer',
            'customerContact',
            'productCategory',
            'purchaseInCharge',
            'createdBy',
            'updatedBy',
            'purchaseOrderDetails',
        ]);

        return Inertia::render('PurchaseOrder/Show', [
            'purchaseOrder' => $purchaseOrder,
        ]);
    }
}
