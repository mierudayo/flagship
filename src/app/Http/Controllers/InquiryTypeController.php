<?php

namespace App\Http\Controllers;

use App\Http\Requests\InquiryTypeStoreRequest;
use App\Models\InquiryType;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InquiryTypeController extends Controller
{
    public function index(): Response
    {
        $inquiryTypes = InquiryType::orderByDisplayOrder()->get();

        return Inertia::render('InquiryType/Index', [
            'inquiryTypes' => $inquiryTypes,
        ]);
    }

    public function store(InquiryTypeStoreRequest $request): RedirectResponse
    {
        $inquiryType = InquiryType::create([
            'name'          => $request->input('name'),
            'custom_label'  => $request->input('custom_label'),
            'display_order' => $request->input('display_order'),
        ]);

        return back()->with('message', "No:{$inquiryType->id} 問い合わせ区分を追加しました。");
    }
}
