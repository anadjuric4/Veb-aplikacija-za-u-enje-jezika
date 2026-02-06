<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'content',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    // ⬇⬇⬇ DODAJ OVO
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}



