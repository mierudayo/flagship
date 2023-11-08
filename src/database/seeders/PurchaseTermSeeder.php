<?php

namespace Database\Seeders;

use App\Models\PurchaseTerm;
use Illuminate\Database\Seeder;

class PurchaseTermSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PurchaseTerm::factory(50)->create();
    }
}
