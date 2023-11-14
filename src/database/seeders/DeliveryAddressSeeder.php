<?php

namespace Database\Seeders;

use App\Models\DeliveryAddress;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeliveryAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DeliveryAddress::factory(100)->create();
    }
}
