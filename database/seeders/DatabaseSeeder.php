<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Organisation;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $org = Organisation::create([
            'name' => 'Development',
            'address' => '1 Flow Street, Flowville',
            'phone' => '0500000000',
            'settings' => json_encode([])
        ]);

        $user = User::create([
            'name' => 'Aaron',
            'email' => 'azza.mangan@gmail.com',
            'password' => 'azza.mangan@gmail.com',
            'organisation_id' => 1,
        ]);
    }
}
