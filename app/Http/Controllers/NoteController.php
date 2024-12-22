<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Type;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class NoteController extends Controller
{

    public function index()
    {
        // Get all types and notes for the authenticated user
        $types = Type::where('user_id', Auth::id())->get();
        $notes = Note::with(['type', 'user'])
            ->where('user_id', Auth::id())
            ->get();

        /// Decrypt the notes_text field for each note
           // Decrypt the notes_text field for each note
        $notes->each(function ($note) {
            try {
                $note->notes_text = Crypt::decryptString($note->notes_text);
            } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
                // Handle decryption error by setting a default or logging the error
                $note->notes_text = 'Invalid encrypted data'; // Default value
                Log::error('Decryption failed for note ID ' . $note->id . ': ' . $e->getMessage());
            }
        });

        // Send data to the Dashboard view using Inertia
        return Inertia::render('Dashboard', [
            'types' => fn () => $types,
            'notes' => fn () =>$notes,
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'notes_title' => 'required|string|max:100',
            'notes_text' => 'required|string',
            'notes_status' => 'required|in:TODO,PROGRESS,DONE',
            'type_id' => 'required|exists:types,id',
        ]);

        Note::create([
            'notes_title' => $request->notes_title,
            'notes_text' => Crypt::encryptString($request->notes_text),
            'notes_status' => $request->notes_status,
            'type_id' => $request->type_id,
            'user_id' => Auth::id(),
        ]);

        return to_route('dashboard');
    }

    public function show($id)
    {
        $note = Note::with(['type', 'user'])->findOrFail($id);

        if ($note->user_id !== Auth::id()) {
            abort(403);
        }

        $note->notes_text = Crypt::decryptString($note->notes_text);

        return Inertia::render('Dashboard', [
            'note' => $note,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'notes_title' => 'required|string|max:100',
            'notes_text' => 'required|string',
            'notes_status' => 'required|in:TODO,PROGRESS,DONE',
            'type_id' => 'required|exists:types,id',
        ]);

        $note = Note::findOrFail($id);

        if ($note->user_id !== Auth::id()) {
            abort(403);
        }

        $note->update([
            'notes_title' => $request->notes_title,
            'notes_text' => Crypt::encryptString($request->notes_text),
            'notes_status' => $request->notes_status,
            'type_id' => $request->type_id,
        ]);

        return to_route('dashboard');
    }

    public function destroy($id)
    {
        $note = Note::findOrFail($id);

        if ($note->user_id !== Auth::id()) {
            abort(403);
        }

        $note->delete();

        return to_route('dashboard');
    }

}
