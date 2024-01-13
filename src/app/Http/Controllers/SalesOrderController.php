<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesOrderSearchRequest;
use App\Http\Requests\SalesOrderStoreRequest;
use App\Http\Requests\SalesOrderUpdateRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetail;
use App\Models\SalesOrder;
use App\Models\SalesOrderDetail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;


class SalesOrderController extends Controller
{
    public function index(SalesOrderSearchRequest $request): Response
    {
        $salesOrders = SalesOrder::query()
            ->with([
                'customer',
                'salesInCharge',
                'productCategory',
                'salesOrderDetails',
            ])
            ->searchByKeyword($request->input('keyword'))
            ->searchByDeliveryPeriod(
                $request->input('start_date'),
                $request->input('end_date')
            )
            ->searchByCustomerName($request->input('customer_name'))
            ->searchBySalesInCharge($request->input('sales_in_charge_id'))
            ->latest()
            ->paginate(100)
            ->withQueryString();

        return Inertia::render('SalesOrder/Index', [
            'salesOrders' => $salesOrders,
            'userOptions' => User::hasSalesOrders()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('SalesOrder/Create', [
            'userOptions'            => User::active()->get(),
            'productOptions'         => Product::all(),
            'productCategoryOptions' => ProductCategory::all(),
        ]);
    }

    public function store(SalesOrderStoreRequest $request): RedirectResponse
    {
        $salesOrder = DB::transaction(function () use ($request) {
            $salesOrder = $this->createSalesOrder($request);
            $this->createDetailRows($salesOrder, $request->input('detail_rows'));
            return $salesOrder;
        });

        return to_route('sales-orders.index')
            ->with('message', "受注ID:{$salesOrder->id} 登録成功しました。");
    }

    public function show(SalesOrder $salesOrder): Response
    {
        $salesOrder->load([
            'billingAddress',
            'customer',
            'customerContact',
            'deliveryAddress',
            'productCategory',
            'salesInCharge',
            'createdBy',
            'updatedBy',
            'salesOrderDetails' => function ($query) {
                $query->with([
                    'product',
                    'purchaseOrderDetails.purchaseOrder' => function ($query) {
                        $query->with([
                            'customer',
                            'purchaseInCharge',
                            'customerContact',
                            'purchaseOrderDetails',
                        ]);
                    },
                ]);
            },
        ]);

        return Inertia::render('SalesOrder/Show', [
            'salesOrder' => $salesOrder,
        ]);
    }

    public function edit(SalesOrder $salesOrder): Response
    {
        $salesOrder->load([
            'customer.billingAddresses',
            'customer.contacts',
            'customer.deliveryAddresses',
            'salesOrderDetails' => function ($query) {
                $query->with([
                    'purchaseOrderDetails.purchaseOrder' => function ($query) {
                        $query->with([
                            'customer.contacts',
                            'customer.deliveryAddresses',
                            'purchaseOrderDetails',
                        ]);
                    },
                ]);
            },
        ]);

        return Inertia::render('SalesOrder/Edit', [
            'salesOrder'             => $salesOrder,
            'userOptions'            => User::active()->get(),
            'productOptions'         => Product::all(),
            'productCategoryOptions' => ProductCategory::all(),
        ]);
    }

    public function duplicate(SalesOrder $salesOrder): Response
    {
        $salesOrder->load([
            'customer.billingAddresses',
            'customer.contacts',
            'customer.deliveryAddresses',
            'salesOrderDetails' => function ($query) {
                $query->with([
                    'purchaseOrderDetails.purchaseOrder' => function ($query) {
                        $query->with([
                            'customer.contacts',
                            'customer.deliveryAddresses',
                            'purchaseOrderDetails',
                        ]);
                    },
                ]);
            },
        ]);

        return Inertia::render('SalesOrder/Duplicate', [
            'salesOrder'             => $salesOrder,
            'userOptions'            => User::active()->get(),
            'productOptions'         => Product::all(),
            'productCategoryOptions' => ProductCategory::all(),
        ]);
    }

    public function update(SalesOrderUpdateRequest $request, SalesOrder $salesOrder): RedirectResponse
    {
        $salesOrder = DB::transaction(function () use ($request, $salesOrder) {
            $salesOrder = $this->updateSalesOrder($request, $salesOrder);
            $this->deleteDetailRows($salesOrder, $request->input('detail_rows'));
            $this->upsertDetailRows($salesOrder, $request->input('detail_rows'));
            return $salesOrder;
        });

        return to_route('sales-orders.show', $salesOrder)
            ->with('message', "受注ID:{$salesOrder->id} 更新成功しました。");
    }

    public function destroy(SalesOrder $salesOrder): RedirectResponse
    {
        DB::transaction(function () use ($salesOrder) {
            $salesOrder->load('salesOrderDetails.purchaseOrderDetails.purchaseOrder');
            foreach ($salesOrder->salesOrderDetails as $soDetail) {
                foreach ($soDetail->purchaseOrderDetails as $poDetail) {
                    $poDetail->purchaseOrder->delete();
                }
            }
            $salesOrder->delete();
        });

        return to_route('sales-orders.index')
            ->with('message', "受注ID:{$salesOrder->id} 削除しました。");
    }

    /*
    |--------------------------------------------------------------------------
    | Business Logic
    |--------------------------------------------------------------------------
    */

    /** 受注登録 */
    private static function createSalesOrder(SalesOrderStoreRequest $request): SalesOrder
    {
        return SalesOrder::create([
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
            'note'                  => $request->input('note'),
            'sales_in_charge_id'    => $request->input('sales_in_charge_id'),
            'created_by_id'         => auth()->user()->id,
        ]);
    }

    /** 受注更新 */
    private static function updateSalesOrder(SalesOrderUpdateRequest $request, SalesOrder $salesOrder): SalesOrder
    {
        $salesOrder->update([
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
            'note'                  => $request->input('note'),
            'sales_in_charge_id'    => $request->input('sales_in_charge_id'),
            'updated_by_id'         => auth()->user()->id,
        ]);

        return $salesOrder;
    }

    /**
     * 明細行（受注明細・発注・発注明細）の紐付き受発注登録処理。明細行は多くて10~20程度の想定,パフォーマンス影響小。
     */
    private function createDetailRows(SalesOrder $salesOrder, array $detailRows): void
    {
        collect($detailRows)->each(function ($detailRow, $index) use ($salesOrder) {
            $salesOrderDetail    = $this->createSalesOrderDetail($detailRow['sales_order_detail'], $salesOrder, $index);
            $purchaseOrder       = $this->createPurchaseOrder($detailRow['purchase_order'], $salesOrder);
            $purchaseOrderDetail = $this->createPurchaseOrderDetail($detailRow['purchase_order_detail'], $purchaseOrder, $salesOrderDetail);
            $salesOrderDetail->purchaseOrderDetails()->attach($purchaseOrderDetail);
        });
    }

    private function upsertDetailRows(SalesOrder $salesOrder, array $detailRows): void
    {
        collect($detailRows)->each(function ($detailRow, $index) use ($salesOrder) {
            $salesOrderDetail    = $this->upsertSalesOrderDetail($detailRow['sales_order_detail'], $salesOrder, $index);
            $purchaseOrder       = $this->upsertPurchaseOrder($detailRow['purchase_order'], $salesOrder);
            $purchaseOrderDetail = $this->upsertPurchaseOrderDetail($detailRow['purchase_order_detail'], $purchaseOrder, $salesOrderDetail);
            $salesOrderDetail->purchaseOrderDetails()->sync($purchaseOrderDetail);
        });
    }

    private function deleteDetailRows(SalesOrder $salesOrder, array $detailRows): void
    {
        $currentSoDetailIds = $salesOrder->salesOrderDetails()->pluck('id');

        $newSoDetailIds = collect($detailRows)->map(function($detailRow) {
            return $detailRow['sales_order_detail']['id'] ?? null;
        })->filter();

        $deletedSoDetailIds = $currentSoDetailIds->diff($newSoDetailIds)->all();
        $salesOrderDetails = SalesOrderDetail::whereIn('id', $deletedSoDetailIds)->get();

        foreach ($salesOrderDetails as $soDetail) {
            // Get the PurchaseOrderDetail related to the SalesOrderDetail (many to many)
            $purchaseOrderDetails = $soDetail->purchaseOrderDetails()->get();

            // Get the parent record of PurchaseOrderDetail, which is PurchaseOrder
            $purchaseOrders = $purchaseOrderDetails->map(function($poDetail) {
                return $poDetail->purchaseOrder;
            });

            // Delete SalesOrderDetail, PurchaseOrderDetail, PurchaseOrder
            $soDetail->delete();
            $purchaseOrderDetails->each(function($poDetail) {
                $poDetail->delete();
            });
            $purchaseOrders->each(function($purchaseOrder) {
                $purchaseOrder->delete();
            });
        }
    }

    /** 受注明細 */
    private function createSalesOrderDetail(array $salesOrderDetail, SalesOrder $salesOrder, int $index): SalesOrderDetail
    {
        return $salesOrder->salesOrderDetails()->create([
            'row_number'        => $index + 1,
            'product_id'        => $salesOrderDetail['product_id'] ?? null,
            'product_name'      => $salesOrderDetail['product_name'] ?? null,
            'product_detail'    => $salesOrderDetail['product_detail'] ?? null,
            'quantity'          => $salesOrderDetail['quantity'],
            'unit_price'        => $salesOrderDetail['unit_price'],
            'tax_rate'          => $salesOrderDetail['tax_rate'],
            'is_tax_inclusive'  => (bool)$salesOrderDetail['is_tax_inclusive'],
            'note'              => $salesOrderDetail['note'] ?? null,
        ]);
    }

    /** 受注明細 */
    private function upsertSalesOrderDetail(array $salesOrderDetail, SalesOrder $salesOrder, int $index): SalesOrderDetail
    {
        $salesOrderDetailData = [
            'row_number'        => $index + 1,
            'product_id'        => $salesOrderDetail['product_id'] ?? null,
            'product_name'      => $salesOrderDetail['product_name'] ?? null,
            'product_detail'    => $salesOrderDetail['product_detail'] ?? null,
            'quantity'          => $salesOrderDetail['quantity'],
            'unit_price'        => $salesOrderDetail['unit_price'],
            'tax_rate'          => $salesOrderDetail['tax_rate'],
            'is_tax_inclusive'  => (bool)$salesOrderDetail['is_tax_inclusive'],
            'note'              => $salesOrderDetail['note'] ?? null,
        ];

        return $salesOrder->salesOrderDetails()->updateOrCreate(
            ['id' => $salesOrderDetail['id'] ?? null],
            $salesOrderDetailData
        );
    }

    /** 発注 */
    private function createPurchaseOrder(array $purchaseOrder, SalesOrder $salesOrder): PurchaseOrder
    {
        return PurchaseOrder::create([
            'customer_id'           => $purchaseOrder['customer_id'] ?? null,
            'customer_contact_id'   => $purchaseOrder['customer_contact_id'] ?? null,
            'billing_address_id'    => $purchaseOrder['billing_address_id'] ?? null,
            'delivery_address_id'   => $purchaseOrder['delivery_address_id'] ?? null,
            'product_category_id'   => $salesOrder->product_category_id,
            'billing_type'          => $purchaseOrder['billing_type'] ?? null,
            'cutoff_day'            => $purchaseOrder['cutoff_day'] ?? null,
            'payment_month_offset'  => $purchaseOrder['payment_month_offset'] ?? null,
            'payment_day'           => $purchaseOrder['payment_day'] ?? null,
            'payment_day_offset'    => $purchaseOrder['payment_day_offset'] ?? null,
            'payment_date'          => $purchaseOrder['payment_date'] ?? null,
            'payment_status'        => $purchaseOrder['payment_status'] ?? null,
            'customer_name'         => $purchaseOrder['customer_name'] ?? null,
            'ship_from_address'     => $purchaseOrder['ship_from_address'] ?? 'TEMP',
            'purchase_date'         => $salesOrder->order_date,
            'note'                  => $purchaseOrder['note'] ?? null,
            'purchase_in_charge_id' => $purchaseOrder['purchase_in_charge_id'] ?? null,
            'created_by_id'         => auth()->user()->id,
        ]);
    }

    /** 発注 */
    private function upsertPurchaseOrder(array $purchaseOrder, SalesOrder $salesOrder): PurchaseOrder
    {
        $purchaseOrderData = [
            'customer_id'           => $purchaseOrder['customer_id'] ?? null,
            'customer_contact_id'   => $purchaseOrder['customer_contact_id'] ?? null,
            'billing_address_id'    => $purchaseOrder['billing_address_id'] ?? null,
            'delivery_address_id'   => $purchaseOrder['delivery_address_id'] ?? null,
            'product_category_id'   => $salesOrder->product_category_id,
            'billing_type'          => $purchaseOrder['billing_type'] ?? null,
            'cutoff_day'            => $purchaseOrder['cutoff_day'] ?? null,
            'payment_month_offset'  => $purchaseOrder['payment_month_offset'] ?? null,
            'payment_day'           => $purchaseOrder['payment_day'] ?? null,
            'payment_day_offset'    => $purchaseOrder['payment_day_offset'] ?? null,
            'payment_date'          => $purchaseOrder['payment_date'] ?? null,
            'payment_status'        => $purchaseOrder['payment_status'] ?? null,
            'customer_name'         => $purchaseOrder['customer_name'] ?? null,
            'ship_from_address'     => $purchaseOrder['ship_from_address'] ?? 'TEMP',
            'purchase_date'         => $salesOrder->order_date,
            'note'                  => $purchaseOrder['note'] ?? null,
            'purchase_in_charge_id' => $purchaseOrder['purchase_in_charge_id'] ?? null,
            'created_by_id'         => auth()->user()->id,
        ];

        return PurchaseOrder::updateOrCreate(
            ['id' => $purchaseOrder['id'] ?? null],
            $purchaseOrderData
        );
    }

    /** 発注明細 */
    private function createPurchaseOrderDetail(array $purchaseOrderDetail, PurchaseOrder $purchaseOrder, SalesOrderDetail $salesOrderDetail): PurchaseOrderDetail
    {
        return $purchaseOrder->purchaseOrderDetails()->create([
            'row_number'        => $salesOrderDetail->row_number,
            'product_id'        => $purchaseOrderDetail['product_id'] ?? null,
            'product_name'      => $salesOrderDetail->product_name,
            'product_detail'    => $purchaseOrderDetail['product_detail'] ?? null,
            'quantity'          => $purchaseOrderDetail['quantity'],
            'unit_price'        => $purchaseOrderDetail['unit_price'],
            'tax_rate'          => $purchaseOrderDetail['tax_rate'],
            'is_tax_inclusive'  => (bool)$purchaseOrderDetail['is_tax_inclusive'],
            'note'              => $purchaseOrderDetail['note'] ?? null,
        ]);
    }

    /** 発注明細 */
    private function upsertPurchaseOrderDetail(array $purchaseOrderDetail, PurchaseOrder $purchaseOrder, SalesOrderDetail $salesOrderDetail): PurchaseOrderDetail
    {
        $purchaseOrderData = [
            'row_number'        => $salesOrderDetail->row_number,
            'product_id'        => $purchaseOrderDetail['product_id'] ?? null,
            'product_name'      => $salesOrderDetail->product_name,
            'product_detail'    => $purchaseOrderDetail['product_detail'] ?? null,
            'quantity'          => $purchaseOrderDetail['quantity'],
            'unit_price'        => $purchaseOrderDetail['unit_price'],
            'tax_rate'          => $purchaseOrderDetail['tax_rate'],
            'is_tax_inclusive'  => (bool)$purchaseOrderDetail['is_tax_inclusive'],
            'note'              => $purchaseOrderDetail['note'] ?? null,
        ];

        return $purchaseOrder->purchaseOrderDetails()->updateOrCreate(
            ['id' => $purchaseOrderDetail['id'] ?? null],
            $purchaseOrderData
        );
    }
}
