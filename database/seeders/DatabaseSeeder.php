<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
            // Seed users table
            $pw = 'user123';
            $userIds = [];
            for ($i = 1; $i <= 5; $i++) {
                $userIds[] = DB::table('users')->insertGetId([
                    'name' => 'User ' . $i,
                    'email' => 'user' . $i . '@example.com',
                    'password' => Hash::make($pw),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
    
            // Seed types table
            $typeIds = [];
            foreach (['Work', 'Personal', 'Urgent'] as $index => $typeName) {
                $typeIds[] = DB::table('types')->insertGetId([
                    'type_name' => $typeName,
                    'user_id' => $userIds[$index % count($userIds)],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
    
            // Seed notes table
            foreach (range(1, 30) as $i) {
                DB::table('notes')->insert([
                    'notes_title' => 'Note Title ' . $i,
                    'notes_text' => 'This is the content of note ' . $i . '.',
                    'notes_status' => ['TODO','PROGRESS', 'DONE'][array_rand(['TODO', 'PROGRESS', 'DONE'])],
                    'type_id' => $typeIds[array_rand($typeIds)],
                    'user_id' => $userIds[array_rand($userIds)],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    
}
