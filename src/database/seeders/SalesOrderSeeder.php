<?php

namespace Database\Seeders;

use App\Models\PurchaseOrderDetail;
use App\Models\SalesOrder;
use App\Models\SalesOrderDetail;
use Illuminate\Database\Seeder;

class SalesOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SalesOrder::factory(100)
        ->has(
            SalesOrderDetail::factory(2)
                ->afterCreating(function (SalesOrderDetail $salesOrderDetails) {
                    $purchaseOrderDetails = PurchaseOrderDetail::inRandomOrder()->first();
                    $salesOrderDetails->purchaseOrderDetails()->attach($purchaseOrderDetails);
                })
        )
        ->create();
    }
}
