import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Search, Trash2, FileX2 } from 'lucide-react';
import AddTypes from '@/Layouts/AddTypeLayout';
import AddNotes from '@/Layouts/AddNotesLayout';
import { Inertia } from '@inertiajs/inertia';
import { DeleteDialog } from '@/Components/DeleteDialog';
import UpdateNotes from '@/Layouts/UpdateNotesLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard({ notes, types, note }) {
    const [notesArray, setNotesArray] = useState(Array.isArray(notes) ? notes : []);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    const filteredNotes = useMemo(() => {
        return notesArray.filter(note => 
            note.notes_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.notes_text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [notesArray, searchTerm]);

    const todoNotes = useMemo(() => filteredNotes.filter(note => note.notes_status === "TODO"), [filteredNotes]);
    const inProgressNotes = useMemo(() => filteredNotes.filter(note => note.notes_status === "PROGRESS"), [filteredNotes]);
    const doneNotes = useMemo(() => filteredNotes.filter(note => note.notes_status === "DONE"), [filteredNotes]);

    const handleDeleteNote = (note) => {
        setNoteToDelete(note);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (noteToDelete) {
            Inertia.delete(route('notes.destroy', noteToDelete.id), {
                onSuccess: () => {
                    setNotesArray(prevNotes => prevNotes.filter(note => note.id !== noteToDelete.id));
                    setDeleteDialogOpen(false);
                    setNoteToDelete(null);
                },
                onError: (errors) => {
                    console.error(errors);
                    setDeleteDialogOpen(false);
                    setNoteToDelete(null);
                }
            });
        }
    };

    const renderNotes = (notesToRender) => (
        <div className="grid mt-5 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notesToRender.length > 0 ? (
                notesToRender.map((note) => (
                    
                    <div
                        key={note.id}
                        className={`group relative rounded-none border-[3px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                            transition-transform duration-300 ease-in-out 
                            hover:translate-x-2 hover:translate-y-2 hover:shadow-none ${
                                note.notes_status === "TODO" ? "bg-yellow-200" :
                                note.notes_status === "PROGRESS" ? "bg-blue-200" :
                                note.notes_status === "DONE" ? "bg-green-200" : "bg-white"
                            }`}
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-bold capitalize">
                                {note.type.type_name}
                            </span>
                            <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-bold">
                                {note.notes_status}
                            </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">{note.notes_title}</h3>
                        <p className="mb-4 text-sm">{note.notes_text}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <UpdateNotes note={note} types={types} />
                                <Button
                                    size="icon"
                                    onClick={() => handleDeleteNote(note)}
                                    variant="outline"
                                    className="h-8 w-8 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-4 border-black bg-gray-200 p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <FileX2 size={64} className="mb-4 text-black" />
                    <h2 className="mb-2 text-2xl font-black text-black">No Notes Available</h2>
                    <p className="text-lg font-bold text-gray-700">
                        It looks like you haven't created any notes yet. Start by adding a new note!
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-white p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h1 className="mb-8 text-6xl font-black">Notes</h1>
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder="Search notes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border-[3px] rounded-none border-black pl-10 font-medium focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                />
                            </div>
                            <AddTypes types={types} />
                            <AddNotes types={types} />
                        </div>
                    </div>

                    <Tabs defaultValue="all" className="w-full mx-auto">
                        <TabsList className="w-full grid grid-cols-4 gap-2 rounded-none bg-transparent p-0">
                            {['all', 'todo', 'progress', 'done'].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="rounded-none border-[3px] border-black bg-white px-3 py-2 text-md font-black uppercase transition-all data-[state=active]:translate-x-[-4px] data-[state=active]:translate-y-[-4px] data-[state=active]:bg-rose-400 data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-rose-100"
                            >
                                {tab.replace('-', ' ')}
                            </TabsTrigger>
                            ))}
                        </TabsList>
                        <TabsContent value="all">
                            {renderNotes(filteredNotes)}
                        </TabsContent>
                        <TabsContent value="todo">
                            {renderNotes(todoNotes)}
                        </TabsContent>
                        <TabsContent value="progress">
                            {renderNotes(inProgressNotes)}
                        </TabsContent>
                        <TabsContent value="done">
                            {renderNotes(doneNotes)}
                        </TabsContent>
                    </Tabs>
                </div>
                <DeleteDialog
                    isOpen={deleteDialogOpen}
                    onClose={() => {
                        setDeleteDialogOpen(false);
                        setNoteToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    noteTitle={noteToDelete?.notes_title || ''}
                />
            </div>
        </AuthenticatedLayout>
    );
}