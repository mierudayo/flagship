<?php

namespace App\Http\Controllers;

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
    public function index(): Response
    {
        $currentMonthRange = $this->getCurrentMonthRange();

        $inquiriesByStatus = $this->getInquiriesCountByStatus($currentMonthRange);
        $inquiriesByType   = $this->getInquiriesCountByType($currentMonthRange);
        $inquiriesCount    = Inquiry::whereBetween('inquiry_date', $currentMonthRange)->count();

        $salesOrdersCount       = SalesOrder::searchByDeliveryPeriod(...$currentMonthRange)->count();
        $salesOrdersTotalSum    = $this->getSalesOrdersTotalSum($currentMonthRange);
        $purchaseOrdersTotalSum = $this->getPurchaseOrdersTotalSum($currentMonthRange);

        $customerContactsCount        = CustomerContact::whereBetween('created_at', $currentMonthRange)->count();
        $customerContactsByLeadSource = $this->getCustomerContactsCountByLeadSource($currentMonthRange);

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

    private function getCurrentMonthRange(): array
    {
        $currentDate = Carbon::today();
        $firstDayOfCurrentMonth = $currentDate->copy()->startOfMonth()->startOfDay();
        $lastDayOfCurrentMonth  = $currentDate->copy()->endOfMonth()->endOfDay();

        return [$firstDayOfCurrentMonth, $lastDayOfCurrentMonth];
    }
}
