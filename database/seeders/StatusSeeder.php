<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    /**
     * The data being inserted.
     */
    public const DATA = [
        'active' => [
            'name' => 'active',
            'description' => 'The item is active',
            'organisation_id' => null,
        ],
        'inactive' => [
            'name' => 'inactive',
            'description' => 'The item is not active',
            'organisation_id' => null,
        ],
        'deleted' => [
            'name' => 'deleted',
            'description' => 'The item has been deleted',
            'organisation_id' => null,
        ],
        'custom' => [
            'name' => 'new',
            'description' => 'The item is new',
            'organisation_id' => null,
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $devOrg = \App\Models\Organisation::latest()->first();
        $seedData = self::DATA;
        $seedData['custom']['organisation_id'] = $devOrg->id ?? null;

        Status::create($seedData['active']);
        Status::create($seedData['inactive']);
        Status::create($seedData['deleted']);
        Status::create($seedData['custom']);
    }
}
