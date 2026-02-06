<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Lista zadataka za jednu lekciju
    public function index($lessonId)
    {
        return response()->json(
            Task::where('lesson_id', $lessonId)->get()
        );
    }

    // Kreiranje zadatka
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'question' => 'required|string',
            'type' => 'required|string',
            'options' => 'nullable|array',
            'correct_answer' => 'required|string',
        ]);

        return response()->json(
            Task::create($validated),
            201
        );
    }

    // Izmena zadatka
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'lesson_id' => 'sometimes|exists:lessons,id',
            'question' => 'sometimes|string',
            'type' => 'sometimes|string',
            'options' => 'nullable|array',
            'correct_answer' => 'sometimes|string',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    // Brisanje zadatka
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}

