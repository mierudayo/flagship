<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaxRateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $taxRates = [
            [
                'rate'          => 0.08,
                'display_rate'  => '8%',
                'start_date'    => '2014-04-01',
                'end_date'      => '2019-09-30',
                'display_order' => 2
            ],
            [
                'rate'          => 0.10,
                'display_rate'  => '10%',
                'start_date'    => '2019-10-01',
                'end_date'      => null,
                'display_order' => 1
            ],
        ];

        DB::table('tax_rates')->insert($taxRates);
    }
}
