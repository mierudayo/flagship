<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCategoryGroupStoreRequest;
use App\Models\ProductCategoryGroup;
use Illuminate\Http\RedirectResponse;

class ProductCategoryGroupController extends Controller
{
    public function store(ProductCategoryGroupStoreRequest $request): RedirectResponse
    {
        $categoryGroup = ProductCategoryGroup::create([
            'name'          => $request->input('name'),
            'display_order' => $request->input('display_order'),
        ]);

        return back()->with('message', "ID:{$categoryGroup->id} カテゴリグループを追加しました。");
    }
}
