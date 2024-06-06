"use client";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface NewProjectButtonProps {
    orgId: string
    disabled?: boolean
};
export const NewProjectButton = ({ orgId, disabled }: NewProjectButtonProps) => {
    const {mutate ,pending} = useApiMutation(api.project.create);
    const onClick = () => {
        mutate({
            title: "untitled",
            orgId
        }).then((id) => {
            toast.success("Project created");
        }).catch((error) => {
            toast.error("error to create project");
        });
    }
    return (
        <button
            disabled={ pending || disabled}
            onClick={onClick}
            className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",(pending ||disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed")}
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-xs text-white font-light">
             New Project
            </p>
        </button>
    )
}