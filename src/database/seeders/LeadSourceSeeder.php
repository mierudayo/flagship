<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeadSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (DB::table('lead_sources')->count() > 0) {
            $this->command->info('Skipping LeadSourceSeeder since records already exist.');
            return;
        }

        $leadSources = [
            ['name' => '問い合わせフォーム', 'display_order' => 1],
            ['name' => 'TEL', 'display_order' => 2],
            ['name' => 'メルマガ', 'display_order' => 3],
            ['name' => '営業', 'display_order' => 4],
            ['name' => '展示会', 'display_order' => 5],
            ['name' => '紹介', 'display_order' => 6],
        ];

        DB::table('lead_sources')->insert($leadSources);
    }
}
