<?php

namespace App\Http\Controllers;

use App\Enums\SalesActivityStatus;
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
            ->searchByStatus($request->input('status'))
            ->latest('contact_date')
            ->paginate($request->input('page_size') ?? 100);

        return Inertia::render('SalesActivity/Index', [
            'salesActivities'      => $salesActivities,
            'inChargeUserOptions'  => User::active()->hasSalesActivities()->get(),
            'salesActivityStatusOptions'  => SalesActivityStatus::toArray(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('SalesActivity/Create', [
            'inChargeUserOptions' => User::active()->get(),
            'salesActivityStatusOptions'  => SalesActivityStatus::toArray(),
        ]);
    }

    public function store(SalesActivityStoreRequest $request): RedirectResponse
    {
        $salesActivity = SalesActivity::create([
            'contact_date'          => $request->input('contact_date'),
            'status'                => $request->input('status'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'proposal'              => $request->input('proposal'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'created_by_id'         => auth()->user()->id,
        ]);

        return to_route('sales-activities.index')
            ->with('message', "No:{$salesActivity->id} 営業履歴を追加しました。");
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
            'salesActivityStatusOptions'  => SalesActivityStatus::toArray(),
        ]);
    }

    public function update(SalesActivityUpdateRequest $request, SalesActivity $salesActivity): RedirectResponse
    {
        $salesActivity->update([
            'contact_date'          => $request->input('contact_date'),
            'status'                => $request->input('status'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'proposal'              => $request->input('proposal'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'updated_by_id'         => auth()->user()->id,
        ]);

        return to_route('sales-activities.index')
            ->with('message', "No:{$salesActivity->id} 営業履歴を更新しました。");
    }

    public function destroy(SalesActivity $salesActivity): RedirectResponse
    {
        $salesActivity->delete();
        return to_route('sales-activities.index');
    }

    public function addToCustomerContact(SalesActivityStoreRequest $request, Customer $customer): RedirectResponse
    {
        $salesActivity = SalesActivity::create([
            'contact_date'          => $request->input('contact_date'),
            'status'                => $request->input('status'),
            'customer_contact_id'   => $request->input('customer_contact_id'),
            'proposal'              => $request->input('proposal'),
            'feedback'              => $request->input('feedback'),
            'note'                  => $request->input('note'),
            'in_charge_user_id'     => $request->input('in_charge_user_id'),
            'created_by_id'         => auth()->user()->id,
        ]);

        return to_route('customers.show', $customer)
            ->with('message', "No:{$salesActivity->id} 営業履歴を追加しました。");
    }
}
