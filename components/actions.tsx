"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/app/store/use-rename-modal";
interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};
export const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
    const {onOpen} = useRenameModal();
    const { mutate , pending } = useApiMutation(api.project.remove);
    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/project/${id}`).then(() => {
            toast.success("Link copied")
        }).catch(() => {
            toast.error("Error to copy link")
        });
    }
    const onDelete = () => {
        mutate({ id }).then(() => {
            toast.success("Project deleted")
        }).catch(() => {
            toast.error("Error to delete project")
        });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset} onClick={(e) => e.stopPropagation()} className="w-60">
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy project link
                </DropdownMenuItem>
                <ConfirmModal header="Delete project ?" description="This will delete the project and all its content" disabled={pending} onConfirm={onDelete}>
                 <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal"  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
                </ConfirmModal>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => { onOpen(id, title) }}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename project 
                </DropdownMenuItem>
                
                {/* <DropdownMenuItem onSelect={() => console.log(`Edit ${title}`)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log(`Delete ${title}`)}>Delete</DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => console.log(`Duplicate ${title}`)}>Duplicate</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}