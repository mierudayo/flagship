<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesActivitySearchRequest;
use App\Http\Requests\SalesActivityStoreRequest;
use App\Http\Requests\SalesActivityUpdateRequest;
use App\Models\Customer;
use App\Models\SalesActivity;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SalesActivityController extends Controller
{
    public function index(SalesActivitySearchRequest $request): Response
    {
        $salesActivities = SalesActivity::query()
            ->with([
                'customerContact.customer',
                'inChargeUser',
            ])
            ->searchByKeyword($request->input('keyword'))
            ->searchByInquiryPeriod(
                $request->input('start_date'),
                $request->input('end_date')
            )
            ->searchByInCharge($request->input('in_charge_user_id'))
            ->latest('contact_date')
            ->paginate(50);

        return Inertia::render('SalesActivity/Index', [
            'salesActivities'      => $salesActivities,
            'inChargeUserOptions'  => User::active()->hasSalesActivities()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('SalesActivity/Create', [
            'inChargeUserOptions' => User::active()->get(),
        ]);
    }

    public function store(SalesActivityStoreRequest $request): RedirectResponse
    {
        $salesActivity = SalesActivity::create([
            'contact_date'          => $request->input('contact_date'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'proposal'              => $request->input('proposal'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'created_by_id'         => auth()->user()->id,
        ]);

        return to_route('sales-activities.index')
            ->with('message', "ID:{$salesActivity->id} 営業履歴を追加しました。");
    }

    public function edit(SalesActivity $salesActivity): Response
    {
        $salesActivity->load([
            'customerContact.customer',
            'inChargeUser',
        ]);

        return Inertia::render('SalesActivity/Edit', [
            'salesActivity' => $salesActivity,
            'inChargeUserOptions' => User::active()->get(),
        ]);
    }

    public function update(SalesActivityUpdateRequest $request, SalesActivity $salesActivity): RedirectResponse
    {
        $salesActivity->update([
            'contact_date'          => $request->input('contact_date'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'proposal'              => $request->input('proposal'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'updated_by_id'         => auth()->user()->id,
        ]);

        return to_route('sales-activities.index')
            ->with('message', "ID:{$salesActivity->id} 営業履歴を更新しました。");
    }

    public function appendToCustomerContact(SalesActivityStoreRequest $request, Customer $customer): RedirectResponse
    {
        $salesActivity = SalesActivity::create([
            'contact_date'          => $request->input('contact_date'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'proposal'              => $request->input('proposal'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'created_by_id'         => auth()->user()->id,
        ]);

        return to_route('customers.show', $customer)
            ->with('message', "ID:{$salesActivity->id} 営業履歴を追加しました。");
    }
}
