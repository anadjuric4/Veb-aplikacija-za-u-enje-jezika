<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('tasks', function (Blueprint $table) {
    $table->id();
    $table->foreignId('lesson_id')->constrained()->onDelete('cascade');
    $table->string('type');
    $table->text('question');
    $table->json('options')->nullable();
    $table->string('answer');
    $table->string('audio_url')->nullable();
    $table->integer('points')->default(1);
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
