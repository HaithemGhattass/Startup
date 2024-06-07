"use client"
import { useRenameModal } from '@/app/store/use-rename-modal'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog';
import { FormEventHandler, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
export const RenameModal = () => {
    const {mutate,pending} = useApiMutation(api.project.update)
    const { 
        isOpen, 
        onClose, 
        initialValues
    } = useRenameModal();
        const [title, setTitle] = useState(initialValues.title);
    useEffect(() => {  
        setTitle(initialValues.title);
    }, [initialValues.title]);
    const OnSubmit: FormEventHandler<HTMLFormElement> = (
        e
    ) => {
        e.preventDefault();
        mutate({ id: initialValues.id, title }).then(() => {
            toast.success("Project renamed")
            onClose()

        }).catch(() => {
            toast.error("Error to rename project")
        });
    }
  
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit project title</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for the project.
                </DialogDescription>
                <form onSubmit={OnSubmit} className="space-y-4">
                    <Input disabled={false} required maxLength={40} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="prject title"/>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={false} type='submit'>
                            Save
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}