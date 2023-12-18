<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesOrderSearchRequest;
use App\Http\Requests\SalesOrderStoreRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetail;
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

        $salesOrders = SalesOrder::query()
            ->with([
                'customer',
                'salesInCharge',
                'productCategory',
                'salesOrderDetails',
            ])
            ->searchByKeyword($keyword)
            ->latest()
            ->paginate(100)
            ->withQueryString();

        return Inertia::render('SalesOrder/Index', [
            'salesOrders' => $salesOrders,
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

    /** 紐付き受発注対応 */
    public function store(SalesOrderStoreRequest $request): RedirectResponse
    {
        // TODO: トランザクションにまとめて登録処理
        $salesOrder           = self::createSalesOrder($request);
        $salesOrderDetails    = self::createSalesOrderDetails($request, $salesOrder->id);
        $purchaseOrders       = self::createPurchaseOrders($request);
        $purchaseOrderDetails = self::createPurchaseOrderDetails($request, $purchaseOrders);

        self::attachOrderDetails($salesOrderDetails, $purchaseOrderDetails);

        return to_route('sales-orders.index')
            ->with('message', "受注ID:{$salesOrder->id} 登録成功しました。");
    }

    public function show(SalesOrder $salesOrder): Response
    {
        $salesOrder->load([
            'customer',
            'customerContact',
            'deliveryAddress',
            'productCategory',
            'salesInCharge',
            'createdBy',
            'updatedBy',
            'salesOrderDetails.purchaseOrderDetails.purchaseOrder.customer',
        ]);

        return Inertia::render('SalesOrder/Show', [
            'salesOrder' => $salesOrder,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | other methods
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

    /** 受注明細登録 */
    private static function createSalesOrderDetails(SalesOrderStoreRequest $request, int $salesOrderId): array
    {
        $detailRows = $request->input('sales_order_details');

        $salesOrderDetails = collect($detailRows)
            ->map(function ($salesOrderDetail, $index) use ($salesOrderId) {
                return [
                    'sales_order_id'    => $salesOrderId,
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
            })->toArray();


        $createdSalesOrderDetails = [];

        foreach ($salesOrderDetails as $salesOrderDetail) {
            $createdSalesOrderDetails[] = SalesOrderDetail::create($salesOrderDetail);
        }

        return $createdSalesOrderDetails;
    }

    /** 紐付き発注登録 */
    private static function createPurchaseOrders(SalesOrderStoreRequest $request): array
    {
        $detailRows = $request->input('sales_order_details');

        $purchaseOrders = collect($detailRows)
            ->map(function ($detailRow) use ($request) {
                $purchaseOrder = $detailRow['purchase_order'];
                return [
                    'customer_id'           => $purchaseOrder['customer_id'] ?? null,
                    'customer_contact_id'   => $purchaseOrder['customer_contact_id'] ?? null,
                    'billing_address_id'    => $purchaseOrder['billing_address_id'] ?? null,
                    'delivery_address_id'   => $purchaseOrder['delivery_address_id'] ?? null,
                    'product_category_id'   => $request->input('product_category_id') ?? null,
                    'billing_type'          => $purchaseOrder['billing_type'] ?? null,
                    'cutoff_day'            => $purchaseOrder['cutoff_day'] ?? null,
                    'payment_month_offset'  => $purchaseOrder['payment_month_offset'] ?? null,
                    'payment_day'           => $purchaseOrder['payment_day'] ?? null,
                    'payment_day_offset'    => $purchaseOrder['payment_day_offset'] ?? null,
                    'payment_date'          => $purchaseOrder['payment_date'] ?? null,
                    'payment_status'        => $purchaseOrder['payment_status'] ?? null,
                    'customer_name'         => $purchaseOrder['customer_name'] ?? null,
                    'ship_from_address'     => $purchaseOrder['ship_from_address'] ?? 'TEMP',
                    'purchase_date'         => $request->input('order_date'),
                    'note'                  => $purchaseOrder['note'] ?? null,
                    'purchase_in_charge_id' => $purchaseOrder['purchase_in_charge_id'] ?? null,
                    'created_by_id'         => auth()->user()->id,
                ];
            })->toArray();

        $createdPurchaseOrders = [];

        foreach ($purchaseOrders as $purchaseOrder) {
            $createdPurchaseOrders[] = PurchaseOrder::create($purchaseOrder);
        }

        return $createdPurchaseOrders;
    }

    /** 紐付き発注明細登録 */
    private static function createPurchaseOrderDetails(SalesOrderStoreRequest $request, array $purchaseOrders): array
    {
        $detailRows = $request->input('sales_order_details');

        foreach ($purchaseOrders as $purchaseOrder) {
            $purchaseOrderDetails = collect($detailRows)
                ->map(function ($detailRow, $index) use ($purchaseOrder) {
                    $purchaseOrderDetail = $detailRow['purchase_order']['purchase_order_details'];
                    return [
                        'purchase_order_id' => $purchaseOrder->id,
                        'row_number'        => $index + 1,
                        'product_id'        => $purchaseOrderDetail['product_id'] ?? null,
                        'product_name'      => $detailRow['product_name'] ?? '',
                        'product_detail'    => $purchaseOrderDetail['product_detail'] ?? null,
                        'quantity'          => $purchaseOrderDetail['quantity'],
                        'unit_price'        => $purchaseOrderDetail['unit_price'],
                        'tax_rate'          => $purchaseOrderDetail['tax_rate'],
                        'is_tax_inclusive'  => (bool)$purchaseOrderDetail['is_tax_inclusive'],
                        'note'              => $purchaseOrderDetail['note'] ?? null,
                    ];
                })->toArray();
        }

        $createdPurchaseOrderDetails = [];

        foreach ($purchaseOrderDetails as $purchaseOrderDetail) {
            $createdPurchaseOrderDetails[] = PurchaseOrderDetail::create($purchaseOrderDetail);
        }

        return $createdPurchaseOrderDetails;
    }

    /** 受注明細と発注明細を紐付け */
    private static function attachOrderDetails(array $salesOrderDetails, array $purchaseOrderDetails): void
    {
        foreach ($salesOrderDetails as $index => $salesOrderDetail) {
            if (isset($purchaseOrderDetails[$index])) {
                $salesOrderDetail->purchaseOrderDetails()->attach($purchaseOrderDetails[$index]);
            }
        }
    }
}
