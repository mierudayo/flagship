<?php

namespace App\Http\Controllers;

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
        $keyword      = $request->input('keyword');
        $inquiryId    = $request->input('inquiry_id');
        $customerInfo = $request->input('customer_info');
        $startDate    = $request->input('start_date');
        $endDate      = $request->input('end_date');
        $inChargeId   = $request->input('in_charge_user_id');
        $status       = $request->input('status');
        $inquiryTypeId  = $request->input('inquiry_type_id');
        $productId  = $request->input('product_id');

        $inquiries = Inquiry::query()
            ->with([
                'customerContact.customer',
                'product.category',
                'inquiryType',
                'inChargeUser',
            ])
            ->searchByKeyword($keyword)
            ->searchByInquiryPeriod($startDate, $endDate)
            ->searchById($inquiryId)
            ->searchByCustomerInfo($customerInfo)
            ->searchByInCharge($inChargeId)
            ->searchByStatus($status)
            ->searchByInquiryType($inquiryTypeId)
            ->searchByProduct($productId)
            ->latest('inquiry_date')
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('Inquiry/Index', [
            'inquiries'             => $inquiries,
            'productOptions'        => Product::all(),
            'inquiryTypeOptions'    => InquiryType::all(),
            'inChargeUserOptions'   => User::active()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Inquiry/Create', [
            'productOptions'         => Product::all(),
            'inquiryTypeOptions'     => InquiryType::all(),
            'inChargeUserOptions'    => User::active()->get(),
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
            'contact_method'        => $request->input('contact_method'),
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
        $inquiry->load([
            'customerContact.customer',
            'createdBy',
            'updatedBy'
        ]);

        return Inertia::render('Inquiry/Edit', [
            'inquiry'                => $inquiry,
            'productOptions'         => Product::all(),
            'inquiryTypeOptions'     => InquiryType::all(),
            'inChargeUserOptions'    => User::active()->get(),
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
            'contact_method'        => $request->input('contact_method'),
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
        $inquiry->delete();
        return to_route('inquiries.index');
    }
}
