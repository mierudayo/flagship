<?php

namespace App\Http\Controllers;

use App\Http\Requests\InquirySearchRequest;
use App\Models\Inquiry;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(InquirySearchRequest $request): Response
    {
        $keyword    = $request->input('keyword', '');

        $inquiryQuery = Inquiry::query()
            ->with(['customerContact.customer', 'product.category', 'inquiryType', 'inChargeUser'])
            ->searchByKeyword($keyword)
            ->latest('inquiry_date');
        $inquiriesPaginator = $inquiryQuery->paginate(50)->withQueryString();

        return Inertia::render('Inquiry/Index', [
            'inquiriesPaginator' => $inquiriesPaginator,
        ]);
    }
}
