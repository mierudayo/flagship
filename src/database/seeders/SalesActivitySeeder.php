<?php

namespace Database\Seeders;

use App\Models\SalesActivity;
use Illuminate\Database\Seeder;

class SalesActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SalesActivity::factory(50)->create();
    }
}
