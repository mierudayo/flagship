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
        $keyword = $request->input('keyword');

        $products = Product::query()
            ->with(['category.group'])
            ->searchByKeyword($keyword)
            ->paginate(100)
            ->withQueryString();

        return Inertia::render('Product/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        $groupOptions    = ProductCategoryGroup::orderBy('display_order')->get();
        $categoryOptions = ProductCategory::orderBy('display_order')->get();

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

        return back()->with('message', "ID:{$product->id} 商品を追加しました。");
    }
}
