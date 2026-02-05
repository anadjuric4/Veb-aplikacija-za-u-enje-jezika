<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    // Lista lekcija za jedan kurs
    public function index($courseId)
    {
        return response()->json(
            Lesson::where('course_id', $courseId)->get()
        );
    }

    // Kreiranje nove lekcije
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        return response()->json(
            Lesson::create($validated),
            201
        );
    }
}
