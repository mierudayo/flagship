<?php

namespace Database\Seeders;

use App\Models\SalesOrder;
use Illuminate\Database\Seeder;

class SalesOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SalesOrder::factory(100)->create();
    }
}
