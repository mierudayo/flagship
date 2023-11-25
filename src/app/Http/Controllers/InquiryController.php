<?php

namespace App\Http\Controllers;

use App\Enums\InquiryLeadSource;
use App\Enums\InquiryStatus;
use App\Http\Requests\InquirySearchRequest;
use App\Http\Requests\InquiryStoreRequest;
use App\Http\Requests\InquiryUpdateRequest;
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
            'productOption'         => Product::all(),
            'inquiryTypeOption'     => InquiryType::all(),
            'inChargeUserOption'    => User::all(),
            'inquiryStatus'         => InquiryStatus::toArray(),
            'inquiryLeadSource'     => InquiryLeadSource::toArray(),
        ]);
    }

    public function store(InquiryStoreRequest $request): RedirectResponse
    {
        $inquiry = Inquiry::create([
            'inquiry_date'          => $request->input('inquiry_date'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'product_id'            => $request->input('product_id'),
            'product_detail'        => $request->input('product_detail'),
            'inquiry_type_id'       => $request->input('inquiry_type_id'),
            'lead_source'           => $request->input('lead_source'),
            'project_scale'         => $request->input('project_scale'),
            'status'                => $request->input('status'),
            'subject'               => $request->input('subject'),
            'message'               => $request->input('message'),
            'answer'                => $request->input('answer'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'created_by_id'         => auth()->user()->id,
        ]);

        return to_route('inquiries.index')
            ->with('message', "問い合わせID:{$inquiry->id} 登録成功しました。");
    }

    public function edit(Inquiry $inquiry): Response
    {
        return Inertia::render('Inquiry/Edit', [
            'inquiry'               => $inquiry->load(['customerContact']),
            'productOption'         => Product::all(),
            'inquiryTypeOption'     => InquiryType::all(),
            'inChargeUserOption'    => User::all(),
            'inquiryStatus'         => InquiryStatus::toArray(),
            'inquiryLeadSource'     => InquiryLeadSource::toArray(),
        ]);
    }

    public function update(InquiryUpdateRequest $request, Inquiry $inquiry): RedirectResponse
    {
        $inquiry->update([
            'inquiry_date'          => $request->input('inquiry_date'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'product_id'            => $request->input('product_id'),
            'product_detail'        => $request->input('product_detail'),
            'inquiry_type_id'       => $request->input('inquiry_type_id'),
            'lead_source'           => $request->input('lead_source'),
            'project_scale'         => $request->input('project_scale'),
            'status'                => $request->input('status'),
            'subject'               => $request->input('subject'),
            'message'               => $request->input('message'),
            'answer'                => $request->input('answer'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'updated_by_id'         => auth()->user()->id,
        ]);

        return to_route('inquiries.index')
            ->with('message', "問い合わせID:{$inquiry->id} 更新しました。");
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        // TODO: 子リソース追加後、存在チェック処理追加

        $inquiry->delete();
        return to_route('inquiries.index');
    }
}
