<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('progress', function (Blueprint $table) {
        $table->id();

        $table->unsignedBigInteger('user_id');
        $table->unsignedBigInteger('course_id')->nullable();
        $table->unsignedBigInteger('lesson_id')->nullable();
        $table->unsignedBigInteger('task_id')->nullable();

        $table->integer('score')->nullable();

        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
   public function down()
{
    Schema::dropIfExists('progress');
}

};
