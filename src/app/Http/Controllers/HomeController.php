<?php

namespace App\Http\Controllers;

use App\Http\Requests\HomeIndexRequest;
use App\Models\CustomerContact;
use App\Models\Inquiry;
use App\Models\PurchaseOrder;
use App\Models\SalesOrder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(HomeIndexRequest $request): Response
    {
        $monthOffset = (int) $request->input('month_offset', 0);

        $targetMonthRange = $this->getMonthRangeByOffset($monthOffset);

        $inquiriesByStatus = $this->getInquiriesCountByStatus($targetMonthRange);
        $inquiriesByType   = $this->getInquiriesCountByType($targetMonthRange);
        $inquiriesCount    = Inquiry::whereBetween('inquiry_date', $targetMonthRange)->count();

        $salesOrdersCount       = SalesOrder::searchByDeliveryPeriod(...$targetMonthRange)->count();
        $salesOrdersTotalSum    = $this->getSalesOrdersTotalSum($targetMonthRange);
        $purchaseOrdersTotalSum = $this->getPurchaseOrdersTotalSum($targetMonthRange);

        $customerContactsCount        = CustomerContact::whereBetween('created_at', $targetMonthRange)->count();
        $customerContactsByLeadSource = $this->getCustomerContactsCountByLeadSource($targetMonthRange);

        return Inertia::render('Home', compact(
            'inquiriesByStatus',
            'inquiriesByType',
            'inquiriesCount',
            'salesOrdersCount',
            'salesOrdersTotalSum',
            'purchaseOrdersTotalSum',
            'customerContactsCount',
            'customerContactsByLeadSource',
        ));
    }

    /** 対象期間の問い合わせ件数(ステータス別) */
    private function getInquiriesCountByStatus(array $dateTimeRange): Collection
    {
        return Inquiry::whereBetween('inquiry_date', $dateTimeRange)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();
    }

    /** 対象期間の問い合わせ件数(区分別) */
    private function getInquiriesCountByType(array $dateTimeRange): Collection
    {
        return Inquiry::whereBetween('inquiry_date', $dateTimeRange)
            ->with('inquiryType')
            ->selectRaw('inquiry_type_id, COUNT(*) as count')
            ->groupBy('inquiry_type_id')
            ->get()
            ->makeHidden('status_label');
    }

    /** 対象期間の受注金額合計 */
    private function getSalesOrdersTotalSum(array $dateTimeRange): int
    {
        return SalesOrder::searchByDeliveryPeriod(...$dateTimeRange)
            ->with('salesOrderDetails')
            ->get()
            ->sum(function ($salesOrder) {
                return $salesOrder->total;
            });
    }

    /** 対象期間の発注金額合計 */
    private function getPurchaseOrdersTotalSum(array $dateTimeRange): int
    {
        return PurchaseOrder::searchByShippingPeriod(...$dateTimeRange)
            ->with('purchaseOrderDetails')
            ->get()
            ->sum(function ($purchaseOrder) {
                return $purchaseOrder->total;
            });
    }

    /** 対象期間の顧客獲得数(リード獲得元別) */
    private function getCustomerContactsCountByLeadSource(array $dateTimeRange): Collection
    {
        return CustomerContact::whereBetween('created_at', $dateTimeRange)
            ->with('leadSource')
            ->selectRaw('lead_source_id, COUNT(*) as count')
            ->groupBy('lead_source_id')
            ->get();
    }

    private function getMonthRangeByOffset(int $monthOffset = 0): array
    {
        $targetDate = Carbon::today()->addMonths($monthOffset);
        $firstDayOfTargetMonth = $targetDate->copy()->startOfMonth()->startOfDay();
        $lastDayOfTargetMonth  = $targetDate->copy()->endOfMonth()->endOfDay();

        return [$firstDayOfTargetMonth, $lastDayOfTargetMonth];
    }
}
