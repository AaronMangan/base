<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Organisation;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\StatusSeeder;
use App\Models\Status;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $org = Organisation::create([
            'name' => 'Development',
            'address' => '1 Flow Street, Flowville',
            'phone' => '0500000000',
            'settings' => json_encode([])
        ]);

        $orgTwo = Organisation::create([
            'name' => 'Testing',
            'address' => '2 Flow Street, Flowville',
            'phone' => '0500000000',
            'settings' => json_encode([])
        ]);

        // Call other seeders.
        $this->call([
            StatusSeeder::class,
        ]);

        $activeStatus = Status::where('name', 'active')->first();

        // Create a Super role
        $roleSuper = Role::create(['name' => 'super']);
        $permissionSuper = Permission::create(['name' => 'full permissions']);
        $roleSuper->givePermissionTo($permissionSuper);

        // Finally, create a user.
        $user = User::create([
            'name' => 'Aaron Mangan',
            'email' => 'azza.mangan@gmail.com',
            'password' => 'azza.mangan@gmail.com',
            'organisation_id' => $org->id,
            'status_id' => $activeStatus->id ?? null,
        ]);

        $user->assignRole($roleSuper);

        $roleAdmin = Role::create(['name' => 'admin']);
        $permissionAdmin = Permission::create(['name' => 'admin']);
        $roleAdmin->givePermissionTo($permissionAdmin);

        $tester = User::create([
            'name' => 'Jasper Hurst-Mangan',
            'email' => 'j.hurst-mangan@localhost.test',
            'password' => 'j.hurst-mangan@localhost.test',
            'organisation_id' => $orgTwo->id,
            'status_id' => $activeStatus->id ?? null,
        ]);

        $tester->assignRole($roleAdmin);
    }
}
