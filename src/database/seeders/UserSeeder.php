<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count() > 0) {
            $this->command->info('Skipping UserSeeder since records already exist.');
            return;
        }

        $password = Hash::make('testpass');
        User::factory()->create([
            'name'          => 'System Admin User',
            'email'         => 'system-admin@example.com',
            'password'      => $password,
            'permission_id' => Permission::where('name', 'system-admin')->first()->id,
        ]);
        User::factory()->create([
            'name'          => 'Admin User',
            'email'         => 'admin@example.com',
            'password'      => $password,
            'permission_id' => Permission::where('name', 'admin')->first()->id,
        ]);
        User::factory()->create([
            'name'          => 'ゲスト',
            'email'         => 'guest@example.com',
            'password'      => $password,
            'permission_id' => Permission::where('name', 'staff')->first()->id,
            'resignation_date' => null,
        ]);

        User::factory(30)->create();
    }
}
