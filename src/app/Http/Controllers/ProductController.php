<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductSearchRequest;
use App\Http\Requests\ProductStoreRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductCategoryGroup;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(ProductSearchRequest $request): Response
    {
        $products = Product::query()
            ->with(['category.group'])
            ->searchByKeyword($request->input('keyword'))
            ->searchByProductNumber($request->input('product_number'))
            ->searchByCategory($request->input('category_id'))
            ->orderByDisplayOrder()
            ->paginate($request->input('page_size') ?? 100)
            ->withQueryString();

        return Inertia::render('Product/Index', [
            'products' => $products,
            'categoryOptions' => ProductCategory::orderByDisplayOrder()->get(),
        ]);
    }

    public function create(): Response
    {
        $groupOptions    = ProductCategoryGroup::orderByDisplayOrder()->get();
        $categoryOptions = ProductCategory::orderByDisplayOrder()->get();

        return Inertia::render('Product/Create', [
            'groupOptions'    => $groupOptions,
            'categoryOptions' => $categoryOptions,
        ]);
    }

    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $product = Product::create([
            'category_id'       => $request->input('category_id'),
            'product_number'    => $request->input('product_number'),
            'product_type'      => $request->input('product_type'),
            'name'              => $request->input('name'),
            'description'       => $request->input('description'),
            'sales_price'       => $request->input('sales_price'),
            'purchase_price'    => $request->input('purchase_price'),
            'display_order'     => $request->input('display_order'),
        ]);

        return back()->with('message', "No:{$product->id} 商品を追加しました。");
    }
}
