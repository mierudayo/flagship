<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfCategoryGroups = 5;
        $categoryPerGroups      = 5;
        $productPerCategory     = 5;

        $categoryGroups = [];
        for ($i = 1; $i <= $numberOfCategoryGroups; $i++) {
            $categoryGroups[] = [
                'id'    => $i,
                'name'  => 'カテゴリグループ' . $i,
                'display_order' => $i,
                'created_at'    => now(),
                'updated_at'    => now(),
            ];
        }
        DB::table('product_category_groups')->insert($categoryGroups);

        $productCategories = [];
        $categoryId = 1;
        foreach ($categoryGroups as $group) {
            for ($j = 0; $j < $categoryPerGroups; $j++) {
                $productCategories[] = [
                    'id'            => $categoryId,
                    'group_id'      => $group['id'],
                    'name'          => '商品カテゴリ' . $categoryId,
                    'display_order' => $j,
                    'created_at'    => now(),
                    'updated_at'    => now(),
                ];
                $categoryId++;
            }
        }
        DB::table('product_categories')->insert($productCategories);

        $products = [];
        foreach ($productCategories as $category) {
            for ($k = 0; $k < $productPerCategory; $k++) {
                $products[] = [
                    'category_id'       => $category['id'],
                    'product_number'    => Str::random(10),
                    'product_type'      => rand(1, 2),
                    'name'              => '商品名' . Str::random(5),
                    'description'       => '商品説明' . Str::random(20),
                    'sales_price'       => rand(100, 1000),
                    'purchase_price'    => rand(50, 500),
                    'display_order'     => $k,
                    'created_at'        => now(),
                    'updated_at'        => now(),
                ];
            }
        }
        DB::table('products')->insert($products);
    }
}
