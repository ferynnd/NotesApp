import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, usePage} from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { Plus } from 'lucide-react';
import React, {useState} from 'react';
import { Label } from "@/components/ui/label"

export default function AddNotes({ types}) {

    const user = usePage().props.auth.user;

    const [loading, setLoading] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        notes_title: '',
        notes_text: '',
        notes_status: 'TODO',
        type_id: types.length > 0 ? types[0].id.toString() : '',
        user_id: user ? user.id : null 
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await post(route('notes.store'),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setData('notes_title', '');
                        setData('notes_text', '');
                        setData('notes_status', 'TODO');
                        setData('type_id', types.length > 0 ? types[0].id.toString() : '');

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
                <Button className="gap-2 border-[3px] rounded-none border-black bg-[#3B82F6] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <Plus className="h-5 w-5" />
                    Add Note
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
                            className="border-2 rounded-none border-black bg-white font-medium focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        />
                        <InputError className="mt-2" message={errors.notes_title} />
    
                        <Textarea
                            id="notes_text"
                            value={data.notes_text}
                            required
                            onChange={(e) => setData({...data, 'notes_text': e.target.value})}
                            placeholder="Enter note text"
                            className="border-2 border-black rounded-none bg-white font-medium focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        />
                        <InputError className="mt-2" message={errors.notes_text} />
    
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                            <Label htmlFor="status" className="text-base font-bold">
                                Status
                            </Label>
                            <Select
                                id="status"
                                value={data.notes_status}
                                onValueChange={(value) => setData('notes_status', value)}
                            >
                                <SelectTrigger className="border-2 rounded-none border-black bg-white font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TODO">TODO</SelectItem>
                                    <SelectItem value="PROGRESS">PROGRESS</SelectItem>
                                    <SelectItem value="DONE">DONE</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="type" className="text-base font-bold">
                                Type
                            </Label>
                            <Select
                                id="type"
                                value={data.type_id}
                                onValueChange={(value) => setData('type_id', value)}
                            >
                                <SelectTrigger className="border-2 rounded-none border-black bg-white font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
                            </div>
                        </div>
        
                        <Button
                            type="submit"
                            disabled={processing}
                            className="border-2 rounded-none border-black bg-[#3B82F6] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                        >
                            <Plus className="h-5 w-5" />
                            Add Note
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );

}