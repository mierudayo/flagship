<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCategoryStoreRequest;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;

class ProductCategoryController extends Controller
{
    public function store(ProductCategoryStoreRequest $request): RedirectResponse
    {
        $category = ProductCategory::create([
            'group_id'      => $request->input('group_id'),
            'name'          => $request->input('name'),
            'display_order' => $request->input('display_order'),
        ]);

        return back()->with('message', "No:{$category->id} カテゴリを追加しました。");
    }
}
