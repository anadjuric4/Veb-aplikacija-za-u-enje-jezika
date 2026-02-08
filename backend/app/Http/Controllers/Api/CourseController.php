<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(Course::all());
    }

    public function show($id)
    {
        return response()->json(Course::findOrFail($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $course = Course::create($validated);

        return response()->json($course, 201);
    }
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);
        
        $course->update($validated);
        
        return response()->json($course);
    }

    // ✅ DODAJ OVO:
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
        
        return response()->json(['message' => 'Course deleted']);
    }
}


