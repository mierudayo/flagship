<?php

namespace Database\Seeders;

use App\Models\SalesOrderDetail;
use Illuminate\Database\Seeder;

class SalesOrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SalesOrderDetail::factory(100)->create();
    }
}
