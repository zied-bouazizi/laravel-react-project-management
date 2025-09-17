<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Workspace;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $owner = User::factory()->create([
            'id' => 1,
            'name' => 'Workspace Owner',
            'email' => 'owner@example.com',
            'email_verified_at' => time()
        ]);

        $member = User::factory()->create([
            'id' => 2,
            'name' => 'Workspace Member',
            'email' => 'member@example.com',
            'email_verified_at' => time(),
            'created_by' => $owner->id
        ]);

        $workspace = Workspace::factory()->create([
            'id' => 1,
            'name' => $owner->name . "'s Workspace",
            'owner_id' => $owner->id
        ]);

        $workspace->members()->attach([
            $owner->id => ['role' => 'owner'],
            $member->id => ['role' => 'member']
        ]);

        Project::factory()
            ->count(30)
            ->for($workspace, 'workspace')
            ->hasTasks(30)
            ->create();
    }
}
