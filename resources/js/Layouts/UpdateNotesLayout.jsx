import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, usePage} from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { Plus, Edit3, ArrowUpToLine } from 'lucide-react';
import React, {useState} from 'react';

export default function UpdateNotes({ types, note}) {


    const [loading, setLoading] = useState(false);

    // Inisialisasi form dengan nilai dari `note`
    const { data, setData, patch, errors, processing } = useForm({
        notes_title: note.notes_title || '',
        notes_text: note.notes_text || '',
        notes_status: note.notes_status || 'TODO',
        type_id: note.type_id ? note.type_id.toString() : (types.length > 0 ? types[0].id.toString() : ''),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await patch(route('notes.update', note.id), {
                onSuccess: () => {
                    // Reset form setelah sukses
                    setData('notes_title', note.notes_title);
                    setData('notes_text', note.notes_text);
                    setData('notes_status', note.notes_status);
                    setData('type_id', note.type_id ? note.type_id.toString() : '');
                },
            });
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };
    
    return loading ? <div>Loading</div> : (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                >
                    <Edit3 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="border-4 border-black p-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <DialogHeader className="border-b-4 border-black p-6">
                    <DialogTitle className="text-2xl font-black">Add a New Note</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            id="notes_title"
                            type="text"
                            value={data.notes_title}
                            required
                            onChange={(e) => setData({...data,'notes_title': e.target.value})}
                            placeholder="Enter note title"
                            className="border-2 border-black bg-white font-medium focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        />
                        <InputError className="mt-2" message={errors.notes_title} />
    
                        <Textarea
                            id="notes_text"
                            value={data.notes_text}
                            required
                            onChange={(e) => setData({...data, 'notes_text': e.target.value})}
                            placeholder="Enter note text"
                            className="border-2 border-black bg-white font-medium focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        />
                        <InputError className="mt-2" message={errors.notes_text} />
    
                        <Select
                            value={data.notes_status}
                            onValueChange={(value) => setData('notes_status', value)}
                        >
                            <SelectTrigger className="border-2 border-black bg-white font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TODO">TODO</SelectItem>
                                <SelectItem value="PROGRESS">PROGRESS</SelectItem>
                                <SelectItem value="DONE">DONE</SelectItem>
                            </SelectContent>
                        </Select>
    
                        <Select
                            value={data.type_id}
                            onValueChange={(value) => setData('type_id', value)}
                        >
                            <SelectTrigger className="border-2 border-black bg-white font-medium shadow-[4px_4px_0px_0px_rgba(0, 0,0,0,1)]">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map((type) => (
                                    <SelectItem key={type.id} value={type.id.toString()}>
                                        {type.type_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
    
                        <Button
                            type="submit"
                            disabled={processing}
                            className="border-2 border-black bg-[#3B82F6] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                        >
                            <ArrowUpToLine className="h-5 w-5" />
                            Update Note
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );

}