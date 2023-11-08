<?php

namespace Database\Seeders;

use App\Models\LogisticsAddress;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LogisticsAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LogisticsAddress::factory(100)->create();
    }
}
