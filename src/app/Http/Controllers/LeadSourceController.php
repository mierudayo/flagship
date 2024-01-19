<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeadSourceStoreRequest;
use App\Models\LeadSource;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LeadSourceController extends Controller
{
    public function index(): Response
    {
        $leadSources = LeadSource::query()
            ->withCount('customerContacts')
            ->orderByDisplayOrder()
            ->get();

        return Inertia::render('LeadSource/Index', [
            'leadSources' => $leadSources,
        ]);
    }

    public function store(LeadSourceStoreRequest $request): RedirectResponse
    {
        $leadSource = LeadSource::create([
            'name'          => $request->input('name'),
            'display_order' => $request->input('display_order'),
        ]);

        return back()->with('message', "No:{$leadSource->id} 獲得元を追加しました。");
    }
}
