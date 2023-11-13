<?php

namespace App\Http\Controllers;

use App\Http\Requests\InquirySearchRequest;
use App\Http\Requests\InquiryStoreRequest;
use App\Http\Requests\InquiryUpdateRequest;
use App\Models\CustomerContact;
use App\Models\Inquiry;
use App\Models\InquiryType;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
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

    public function create(): Response
    {
        return Inertia::render('Inquiry/Create', [
            'customerContactOption' => CustomerContact::all(),
            'productOption'         => Product::all(),
            'inquiryTypeOption'     => InquiryType::all(),
            'inChargeUserOption'    => User::all(),
        ]);
    }

    public function store(InquiryStoreRequest $request)
    {
        $inquiry = Inquiry::create([
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'product_id'            => $request->input('product_id'),
            'inquiry_type_id'       => $request->input('inquiry_type_id'),
            'lead_source'           => $request->input('lead_source'),
            'status'                => $request->input('status'),
            'subject'               => $request->input('subject'),
            'message'               => $request->input('message'),
            'answer'                => $request->input('answer'),
            'result'                => $request->input('result'),
            'result_reason'         => $request->input('result_reason'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'created_by_id'         => auth()->user()->id,
            'inquiry_date'          => $request->input('inquiry_date'),
        ]);

        return to_route('inquiries.index')
            ->with('message', "問い合わせID:{$inquiry->id} 登録成功しました。");
    }

    public function edit(Inquiry $inquiry): Response
    {
        return Inertia::render('Inquiry/Edit', [
            'inquiry'               => $inquiry,
            'customerContactOption' => CustomerContact::all(),
            'productOption'         => Product::all(),
            'inquiryTypeOption'     => InquiryType::all(),
            'inChargeUserOption'    => User::all(),
        ]);
    }

    public function update(InquiryUpdateRequest $request, Inquiry $inquiry): RedirectResponse
    {
        $inquiry->update([
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'product_id'            => $request->input('product_id'),
            'inquiry_type_id'       => $request->input('inquiry_type_id'),
            'lead_source'           => $request->input('lead_source'),
            'status'                => $request->input('status'),
            'subject'               => $request->input('subject'),
            'message'               => $request->input('message'),
            'answer'                => $request->input('answer'),
            'result'                => $request->input('result'),
            'result_reason'         => $request->input('result_reason'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'updated_by_id'         => auth()->user()->id,
            'inquiry_date'          => $request->input('inquiry_date'),
        ]);

        return to_route('inquiries.index')
            ->with('message', "問い合わせID:{$inquiry->id} 更新しました。");
    }
}
