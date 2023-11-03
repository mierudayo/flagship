<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (DB::table('permissions')->count() > 0) {
            $this->command->info('Skipping PermissionSeeder since records already exist.');
            return;
        }

        $permissions = [
            ['id' => 1, 'level' => 1, 'name' => 'system-admin', 'display_name' => 'システム管理者', 'created_at' => now()],
            ['id' => 2, 'level' => 2, 'name' => 'admin',        'display_name' => '管理者',         'created_at' => now()],
            ['id' => 3, 'level' => 3, 'name' => 'staff',        'display_name' => '担当者',         'created_at' => now()],
        ];

        DB::table('permissions')->insert($permissions);
    }
}
