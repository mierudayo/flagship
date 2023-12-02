<?php

namespace Database\Seeders;

use App\Models\BillingAddress;
use Illuminate\Database\Seeder;

class BillingAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BillingAddress::factory(50)->create();
    }
}
