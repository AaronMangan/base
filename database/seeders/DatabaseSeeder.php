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
use Exception;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!$this->environmentCredentials()) {
            throw new \Exception('Please check your .env file has the right credentials, or remove this seeder');
        }

        // Super Admin Organisation
        $superOrg = Organisation::create([
            'name' => env('ADMIN_ORG_NAME'),
            'address' => env('ADMIN_ADDRESS', null),
            'phone' => env('ADMIN_PHONE', null),
            'settings' => json_encode([])
        ]);

        // Regular Organisation
        $adminOrg = Organisation::create([
            'name' => env('USER_ORG_NAME'),
            'address' => env('USER_ADDRESS', null),
            'phone' => env('USER_PHONE', null),
            'settings' => json_encode([])
        ]);

        // Call other seeders.
        $this->call([
            StatusSeeder::class,
        ]);

        // Set the created models to the active status.
        $activeStatus = Status::where('name', 'active')->first();

        // Create a Super role
        $roleSuper = Role::create(['name' => 'super']);
        $permissionSuper = Permission::create(['name' => 'full permissions']);
        $roleSuper->givePermissionTo($permissionSuper);

        // Create a super admin user.
        $adminUser = User::create([
            'name' => env('ADMIN_NAME'),
            'email' => env('ADMIN_NAME'),
            'password' => env('ADMIN_PASSWORD'),
            'organisation_id' => $superOrg->id,
            'status_id' => $activeStatus->id ?? null,
        ]);
        // Assign that user the role.
        $adminUser->assignRole($roleSuper);

        // Create an admin org and permissions
        $roleAdmin = Role::create(['name' => 'admin']);
        $permissionAdmin = Permission::create(['name' => 'admin']);
        $roleAdmin->givePermissionTo($permissionAdmin);

        // Create an admin user.
        $adminUser = User::create([
            'name' => 'Jasper Hurst-Mangan',
            'email' => 'j.hurst-mangan@localhost.test',
            'password' => 'j.hurst-mangan@localhost.test',
            'organisation_id' => $adminOrg->id,
            'status_id' => $activeStatus->id ?? null,
        ]);

        // Assign the role to that user.
        $adminUser->assignRole($roleAdmin);
    }

    private function environmentCredentials(): ?bool
    {
        $data = [
            env('ADMIN_ORG_NAME', false),
            env('ADMIN_NAME', false),
            env('ADMIN_PASSWORD', false),
            env('USER_ORG_NAME', false),
            env('USER_NAME', false),
            env('USER_PASSWORD', false),
        ];

        return (in_array(false, $data)) ? false : true;
    }
}
