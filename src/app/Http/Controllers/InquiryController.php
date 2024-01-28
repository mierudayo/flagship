<?php

namespace App\Http\Controllers;

use App\Enums\ContactMethod;
use App\Enums\InquiryStatus;
use App\Http\Requests\InquirySearchRequest;
use App\Http\Requests\InquiryStoreRequest;
use App\Http\Requests\InquiryUpdateRequest;
use App\Models\Inquiry;
use App\Models\InquiryType;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(InquirySearchRequest $request): Response
    {
        $inquiries = Inquiry::query()
            ->with([
                'customerContact.customer',
                'product.category',
                'inquiryType',
                'inChargeUser',
            ])
            ->searchByKeyword($request->input('keyword'))
            ->searchByInquiryPeriod(
                $request->input('start_date'),
                $request->input('end_date')
            )
            ->searchById($request->input('inquiry_id'))
            ->searchByCustomerInfo($request->input('customer_info'))
            ->searchByInCharge($request->input('in_charge_user_id'))
            ->searchByStatus($request->input('status'))
            ->searchByInquiryType($request->input('inquiry_type_id'))
            ->searchByProduct($request->input('product_id'))
            ->latest('inquiry_date')
            ->paginate($request->input('page_size') ?? 100)
            ->withQueryString();

        return Inertia::render('Inquiry/Index', [
            'inquiries'             => $inquiries,
            'productOptions'        => Product::hasInquiries()->get(),
            'inquiryTypeOptions'    => InquiryType::all(),
            'inquiryStatusOptions'  => InquiryStatus::toArray(),
            'inChargeUserOptions'   => User::active()->hasInquiries()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Inquiry/Create', [
            'productOptions'         => Product::all(),
            'inquiryTypeOptions'     => InquiryType::all(),
            'inquiryStatusOptions'   => InquiryStatus::toArray(),
            'inChargeUserOptions'    => User::active()->get(),
            'contactMethodOptions'   => ContactMethod::toArray(),
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
            ->with('message', "問い合わせNo:{$inquiry->id} 登録成功しました。");
    }

    public function edit(Inquiry $inquiry, Request $request): Response
    {
        $returnToUrl = $request->headers->get('referer');

        $inquiry->load([
            'customerContact.customer',
            'createdBy',
            'updatedBy'
        ]);

        return Inertia::render('Inquiry/Edit', [
            'returnToUrl'            => $returnToUrl,
            'inquiry'                => $inquiry,
            'productOptions'         => Product::all(),
            'inquiryTypeOptions'     => InquiryType::all(),
            'inquiryStatusOptions'   => InquiryStatus::toArray(),
            'inChargeUserOptions'    => User::active()->get(),
            'contactMethodOptions'   => ContactMethod::toArray(),
        ]);
    }

    public function update(InquiryUpdateRequest $request, Inquiry $inquiry): RedirectResponse
    {
        $returnToUrl = $request->input('return_to_url', route('inquiries.index'));

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

        return redirect($returnToUrl)
            ->with('message', "問い合わせNo:{$inquiry->id} 更新しました。");
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();
        return to_route('inquiries.index');
    }
}
