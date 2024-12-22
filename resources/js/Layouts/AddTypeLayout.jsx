import React from 'react';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/Components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from 'lucide-react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function AddTypes({ types, setTypes }) {

    const user = usePage().props.auth.user;

    const { data, setData, post ,delete : destroy,errors, processing, recentlySuccessful } = useForm({
            type_name : '',
            user_id : user ? user.id : null // This is set to the currently logged-in user's ID
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('type.store'));
    };

    const handleDeleteType = async (id) => {
        try {
            await destroy(route('type.destroy', { id }));
            setTypes(types.filter(type => type.id !== id));
        } catch (error) {
            console.error(`Failed to delete type with id: ${id}`, error);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2 border-[3px] rounded-none border-black bg-[#3B82F6] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <Plus className="h-5 w-5" />
                    Add Type
                </Button>
            </DialogTrigger>
            <DialogContent className="border-4 border-black p-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <DialogHeader className="border-b-4 border-black p-6">
                    <DialogTitle className="text-2xl font-black">Manage Types</DialogTitle>
                    <DialogDescription className="text-base font-medium">
                        Add or remove note types
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            id="type_name"
                            type="text"
                            value={data.type_name}
                            required
                            onChange={(e) => setData('type_name', e.target.value)}
                            placeholder="Enter type name"
                            className="border-2 rounded-none border-black bg-white font-medium focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        />
                        <InputError className="mt-2" message={errors.name} />
                        <Button
                            type="submit"
                            disabled={processing}
                            className="border-2 border-black rounded-none bg-[#3B82F6] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                        >
                            <Plus className="h-5 w-5" />
                        </Button>
                    </form>
                    <div className="mt-6">
                        <Table>
                            <TableHeader className="border-2 border-black [&_tr]:border-b-0">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-black">Type Name</TableHead>
                                    <TableHead className="w-[100px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="border-2 border-black [&_tr:last-child]:border-b-0">
                                {types.map((type) => (
                                    <TableRow key={type.id} className="hover:bg-transparent [&_td]:border-b-2 [&_td]:border-black">
                                        <TableCell className ="font-medium">{type.type_name}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleDeleteType(type.id)}
                                                size="icon"
                                                variant="outline"
                                                className="h-8 w-8 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}