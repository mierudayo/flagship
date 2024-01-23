<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesOrderSearchRequest;
use App\Http\Requests\SalesOrderStoreRequest;
use App\Http\Requests\SalesOrderUpdateRequest;
use App\Models\Customer;
use App\Models\DeliveryAddress;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetail;
use App\Models\SalesOrder;
use App\Models\SalesOrderDetail;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;


class SalesOrderController extends Controller
{
    public function index(SalesOrderSearchRequest $request): Response
    {
        $query       = $this->getSalesOrdersQuery($request);
        $salesOrders = $query->paginate($request->input('page_size') ?? 100)->withQueryString();
        $totals      = $this->calculateTotals($salesOrders->items());

        return Inertia::render('SalesOrder/Index', [
            'salesOrders' => $salesOrders,
            'userOptions' => User::hasSalesOrders()->get(),
            'productCategoryOptions' => ProductCategory::all(),
            'totals'      => $totals,
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
            ->with('message', "受注No:{$salesOrder->id} 登録成功しました。");
    }

    public function show(SalesOrder $salesOrder): Response
    {
        $salesOrder->load([
            'billingAddress',
            'customer',
            'customerContact',
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

        return to_route('sales-orders.index')
            ->with('message', "受注No:{$salesOrder->id} 更新成功しました。");
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
            ->with('message', "受注No:{$salesOrder->id} 削除しました。");
    }

    /*
    |--------------------------------------------------------------------------
    | Business Logic
    |--------------------------------------------------------------------------
    */

    private function getSalesOrdersQuery(SalesOrderSearchRequest $request): Builder
    {
        return SalesOrder::query()
            ->with([
                'customer',
                'salesInCharge',
                'productCategory',
                'salesOrderDetails.purchaseOrderDetails',
            ])
            ->searchByKeyword($request->input('keyword'))
            ->searchByDeliveryPeriod(
                $request->input('start_date'),
                $request->input('end_date')
            )
            ->searchByProductCategory($request->input('product_category_id'))
            ->searchByProductName($request->input('product_name'))
            ->searchByProductDetail($request->input('product_detail'))
            ->searchByCustomerName($request->input('customer_name'))
            ->searchBySalesInCharge($request->input('sales_in_charge_id'))
            ->searchByConsignee($request->input('consignee'))
            ->latest();
    }

    /** 受注登録 */
    private function createSalesOrder(SalesOrderStoreRequest $request): SalesOrder
    {
        $deliveryAddress = DeliveryAddress::find($request->input('delivery_address_id'));

        return SalesOrder::create([
            'customer_id'           => $request->input('customer_id'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'billing_address_id'    => $request->input('billing_address_id'),
            'delivery_address_id'   => $deliveryAddress->id ?? null,
            'product_category_id'   => $request->input('product_category_id'),
            'billing_type'          => $request->input('billing_type'),
            'cutoff_day'            => $request->input('cutoff_day'),
            'payment_month_offset'  => $request->input('payment_month_offset'),
            'payment_day'           => $request->input('payment_day'),
            'payment_day_offset'    => $request->input('payment_day_offset'),
            'payment_date'          => $request->input('payment_date'),
            'payment_status'        => $request->input('payment_status'),
            'delivery_address'      => $deliveryAddress->address ?? null,
            'consignee_company'     => $deliveryAddress->company_name ?? null,
            'consignee_contact'     => $deliveryAddress->contact_name ?? null,
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
    private function updateSalesOrder(SalesOrderUpdateRequest $request, SalesOrder $salesOrder): SalesOrder
    {
        $deliveryAddress = DeliveryAddress::find($request->input('delivery_address_id'));

        $salesOrder->update([
            'customer_id'           => $request->input('customer_id'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'billing_address_id'    => $request->input('billing_address_id'),
            'delivery_address_id'   => $deliveryAddress->id ?? null,
            'product_category_id'   => $request->input('product_category_id'),
            'billing_type'          => $request->input('billing_type'),
            'cutoff_day'            => $request->input('cutoff_day'),
            'payment_month_offset'  => $request->input('payment_month_offset'),
            'payment_day'           => $request->input('payment_day'),
            'payment_day_offset'    => $request->input('payment_day_offset'),
            'payment_date'          => $request->input('payment_date'),
            'payment_status'        => $request->input('payment_status'),
            'delivery_address'      => $deliveryAddress->address ?? null,
            'consignee_company'     => $deliveryAddress->company_name ?? null,
            'consignee_contact'     => $deliveryAddress->contact_name ?? null,
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

        $newSoDetailIds = collect($detailRows)->map(function ($detailRow) {
            return $detailRow['sales_order_detail']['id'] ?? null;
        })->filter();

        $deletedSoDetailIds = $currentSoDetailIds->diff($newSoDetailIds)->all();
        $salesOrderDetails = SalesOrderDetail::whereIn('id', $deletedSoDetailIds)->get();

        foreach ($salesOrderDetails as $soDetail) {
            $purchaseOrderDetails = $soDetail->purchaseOrderDetails()->get();

            $purchaseOrders = $purchaseOrderDetails->map(function ($poDetail) {
                return $poDetail->purchaseOrder;
            });

            $soDetail->delete();

            $purchaseOrderDetails->each(function ($poDetail) {
                $poDetail->delete();
            });

            $purchaseOrders->each(function ($purchaseOrder) {
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
        $deliveryAddress = DeliveryAddress::find($purchaseOrder['delivery_address_id'] ?? null);
        $customer        = Customer::find($purchaseOrder['customer_id']);
        $purchaseTerm    = $customer?->purchaseTerm;

        return PurchaseOrder::create([
            'customer_id'           => $customer->id,
            'customer_contact_id'   => $purchaseOrder['customer_contact_id'] ?? null,
            'delivery_address_id'   => $deliveryAddress->id ?? null,
            'product_category_id'   => $salesOrder->product_category_id,
            'billing_type'          => $purchaseTerm?->billing_type,
            'cutoff_day'            => $purchaseTerm?->cutoff_day,
            'payment_month_offset'  => $purchaseTerm?->payment_month_offset,
            'payment_day'           => $purchaseTerm?->payment_day,
            'payment_day_offset'    => $purchaseTerm?->payment_day_offset,
            'payment_date'          => $purchaseOrder['payment_date'] ?? null,
            'payment_status'        => $purchaseOrder['payment_status'] ?? null,
            'ship_from_address'     => $deliveryAddress->address ?? null,
            'ship_from_company'     => $deliveryAddress->company_name ?? null,
            'ship_from_contact'     => $deliveryAddress->contact_name ?? null,
            'shipping_date'         => $salesOrder->shipping_date,
            'purchase_date'         => $salesOrder->order_date,
            'note'                  => $purchaseOrder['note'] ?? null,
            'purchase_in_charge_id' => $purchaseOrder['purchase_in_charge_id'] ?? null,
            'created_by_id'         => auth()->user()->id,
        ]);
    }

    /** 発注 */
    private function upsertPurchaseOrder(array $purchaseOrder, SalesOrder $salesOrder): PurchaseOrder
    {
        $deliveryAddress = DeliveryAddress::find($purchaseOrder['delivery_address_id'] ?? null);
        $customer        = Customer::find($purchaseOrder['customer_id']);
        $purchaseTerm    = $customer?->purchaseTerm;

        $purchaseOrderData = [
            'customer_id'           => $customer->id,
            'customer_contact_id'   => $purchaseOrder['customer_contact_id'] ?? null,
            'delivery_address_id'   => $deliveryAddress->id ?? null,
            'product_category_id'   => $salesOrder->product_category_id,
            'billing_type'          => $purchaseTerm?->billing_type,
            'cutoff_day'            => $purchaseTerm?->cutoff_day,
            'payment_month_offset'  => $purchaseTerm?->payment_month_offset,
            'payment_day'           => $purchaseTerm?->payment_day,
            'payment_day_offset'    => $purchaseTerm?->payment_day_offset,
            'payment_date'          => $purchaseOrder['payment_date'] ?? null,
            'payment_status'        => $purchaseOrder['payment_status'] ?? null,
            'ship_from_address'     => $deliveryAddress->address ?? null,
            'ship_from_company'     => $deliveryAddress->company_name ?? null,
            'ship_from_contact'     => $deliveryAddress->contact_name ?? null,
            'purchase_date'         => $salesOrder->order_date,
            'shipping_date'         => $salesOrder->shipping_date,
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

    private function calculateTotals(array $salesOrders): array
    {
        $soTotal        = 0;
        $soTotalWithTax = 0;
        $poTotal        = 0;
        $poTotalWithTax = 0;

        foreach ($salesOrders as $salesOrder) {
            $soTotal += $salesOrder['total'];
            $soTotalWithTax += $salesOrder['total_with_tax'];

            foreach ($salesOrder['salesOrderDetails'] as $soDetail) {
                foreach ($soDetail['purchaseOrderDetails'] as $poDetail) {
                    $poTotal        += $poDetail['price'];
                    $poTotalWithTax += $poDetail['price_with_tax'];
                }
            }
        }

        $profit = $soTotal - $poTotal;

        return compact('soTotal', 'soTotalWithTax', 'poTotal', 'poTotalWithTax', 'profit');
    }
}
