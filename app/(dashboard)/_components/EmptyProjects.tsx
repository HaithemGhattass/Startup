"use client";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const EmptyProjects = () => {
    const router = useRouter();
    const {organization} = useOrganization();
    const {mutate , pending} = useApiMutation(api.project.create);
    const onClick = () => {
        if(!organization) return;
        mutate({
            title: "New project",
            orgId: organization.id,
        })
            .then((id) => {
                toast.success("Project created");
                router.push(`/project/${id}`);
         })
        .catch((error) => { toast.error("error to create project"); });
    }
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/note.svg" alt="Empty" height={110} width={110} />
            <h2 className="text-2xl font-semibold mt-6">Create your first project</h2>
            <p className="text-muted-foreground text-sm mt-2">Start by creating a project for your organization</p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">Create project</Button>
                </div>
                
        </div>
    );
}