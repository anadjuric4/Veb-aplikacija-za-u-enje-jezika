<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        

        echo "🗑️  Tables cleared\n";

        // ========== USERS ==========
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@test.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Ana Djuric',
                'email' => 'ana@test.com',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Test User',
                'email' => 'test@test.com',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        echo "✅ Created 3 users\n";

        // ========== COURSES ==========
        $englishId = DB::table('courses')->insertGetId([
            'title' => 'English for Beginners',
            'description' => 'Learn English from scratch',
            'language' => 'English',
            'level' => 'beginner',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $spanishId = DB::table('courses')->insertGetId([
            'title' => 'Spanish for Beginners',
            'description' => 'Learn Spanish basics',
            'language' => 'Spanish',
            'level' => 'beginner',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $germanId = DB::table('courses')->insertGetId([
            'title' => 'German Intermediate',
            'description' => 'Intermediate German course',
            'language' => 'German',
            'level' => 'intermediate',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        echo "✅ Created 3 courses\n";

        // ========== LESSONS ==========
        $greetingsId = DB::table('lessons')->insertGetId([
            'course_id' => $englishId,
            'title' => 'Greetings',
            'content' => 'Learn how to greet people in English',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $numbersId = DB::table('lessons')->insertGetId([
            'course_id' => $englishId,
            'title' => 'Numbers',
            'content' => 'Learn to count from 1 to 100',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $foodId = DB::table('lessons')->insertGetId([
            'course_id' => $englishId,
            'title' => 'Food & Drinks',
            'content' => 'Common food vocabulary',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $saludosId = DB::table('lessons')->insertGetId([
            'course_id' => $spanishId,
            'title' => 'Saludos',
            'content' => 'Spanish greetings and introductions',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $grundlagenId = DB::table('lessons')->insertGetId([
            'course_id' => $germanId,
            'title' => 'Grundlagen',
            'content' => 'German language basics',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        echo "✅ Created 5 lessons\n";

        // ========== TASKS ==========
        DB::table('tasks')->insert([
            // Greetings lesson
            [
                'lesson_id' => $greetingsId,
                'question' => 'Translate the word: Zdravo',
                'type' => 'translate',
                'options' => null,
                'correct_answer' => 'Hello',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'lesson_id' => $greetingsId,
                'question' => 'What does "Good morning" mean in Serbian?',
                'type' => 'multiple_choice',
                'options' => json_encode(['Dobro veče', 'Dobro jutro', 'Laku noć', 'Dobar dan']),
                'correct_answer' => 'Dobro jutro',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Numbers lesson
            [
                'lesson_id' => $numbersId,
                'question' => 'How do you say "five" in English?',
                'type' => 'multiple_choice',
                'options' => json_encode(['Four', 'Five', 'Six', 'Seven']),
                'correct_answer' => 'Five',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'lesson_id' => $numbersId,
                'question' => 'Translate: deset',
                'type' => 'translate',
                'options' => null,
                'correct_answer' => 'Ten',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Food lesson
            [
                'lesson_id' => $foodId,
                'question' => 'What is "bread" in Serbian?',
                'type' => 'multiple_choice',
                'options' => json_encode(['Voda', 'Hleb', 'Mleko', 'Sir']),
                'correct_answer' => 'Hleb',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        echo "✅ Created 5 tasks\n";

        echo "\n";
        echo "🎉 Database seeded successfully!\n";
        echo "📊 Summary:\n";
        echo "   - 3 Users (admin@test.com, ana@test.com, test@test.com)\n";
        echo "   - 3 Courses (English, Spanish, German)\n";
        echo "   - 5 Lessons\n";
        echo "   - 5 Tasks\n";
        echo "🔑 Password for all users: password123\n";
    }
}