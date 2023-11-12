<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InquiryTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (DB::table('inquiry_types')->count() > 0) {
            $this->command->info('Skipping InquiryTypeSeeder since records already exist.');
            return;
        }

        $defaultTypes = [
            [
                'name'          => '製品仕様',
                'custom_label'  => 'blue',
                'display_order' => 1,
                'created_at'    => now(),
            ],
            [
                'name'          => 'サービス',
                'custom_label'  => 'green',
                'display_order' => 2,
                'created_at'    => now(),
            ],
            [
                'name'          => '見積依頼',
                'custom_label'  => 'orange',
                'display_order' => 3,
                'created_at'    => now(),
            ],
            [
                'name'          => '注文・配送',
                'custom_label'  => 'gray',
                'display_order' => 4,
                'created_at'    => now(),
            ],
            [
                'name'          => 'クレーム',
                'custom_label'  => 'red',
                'display_order' => 5,
                'created_at'    => now(),
            ],
        ];

        DB::table('inquiry_types')->insert($defaultTypes);
    }
}
