<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (DB::table('regions')->count() > 0) {
            $this->command->info('Skipping PrefecturesTableSeeder since records already exist.');
            return;
        }

        $regions = [
            ['name' => '北海道'],
            ['name' => '東北'],
            ['name' => '関東'],
            ['name' => '中部'],
            ['name' => '近畿'],
            ['name' => '中国'],
            ['name' => '四国'],
            ['name' => '九州'],
        ];

        DB::table('regions')->insert($regions);
    }
}
