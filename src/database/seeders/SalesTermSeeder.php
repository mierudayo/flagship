<?php

namespace Database\Seeders;

use App\Models\SalesTerm;
use Illuminate\Database\Seeder;

class SalesTermSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SalesTerm::factory(50)->create();
    }
}
