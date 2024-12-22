import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteDialog({ isOpen, onClose, onConfirm, noteTitle }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="border-4 border-black p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <DialogHeader className="border-b-4 border-black p-6">
            <DialogTitle className="text-2xl font-black">Delete Note</DialogTitle>
            <DialogDescription className="text-base font-medium">
                Are you sure you want to delete this note?
            </DialogDescription>
            </DialogHeader>
            <div className="p-6">
            <p className="text-lg font-bold">{noteTitle}</p>
            </div>
            <DialogFooter className="border-t-4 border-black p-6">
            <div className="flex w-full gap-4">
                <Button
                onClick={onClose}
                className="flex-1 border-4 border-black bg-white font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                Cancel
                </Button>
                <Button
                onClick={onConfirm}
                className="flex-1 border-4 border-black bg-red-500 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                Delete
                </Button>
            </div>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}