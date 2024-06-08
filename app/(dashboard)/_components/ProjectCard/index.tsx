"use clien"

import Link  from "next/link"
import { Overlay } from "./overlay"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs"
import { Footer } from "./footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Actions } from "@/components/actions"
import { MoreHorizontal } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"

interface ProjectCardProps {
    id: string
    title: string
    creatorId: string
    creatorName: string
    creationDate: number
    orgId: string
    isfavourite: boolean
};
export const ProjectCard = ({
    id,
    title,
    creatorId,
    creatorName,
    creationDate,
    orgId,
    isfavourite
}: ProjectCardProps) => {
    const { userId } = useAuth();
    const creatorLabel = userId === creatorId ? "You" : creatorName;
    const creationTime = formatDistanceToNow(creationDate, { addSuffix: true });
    const { 
        mutate: onFavorite,
        pending: PendingFavorite
    } = useApiMutation(api.project.favorite)
    const {
        mutate: onUnfavorite,
        pending: PendingUnfavorite
    } = useApiMutation(api.project.unfavorite);
    const ToggleFavorite = () => {
        if (isfavourite) {
            onUnfavorite({ id }).catch(() => { toast.error("Error to unfavorite project")});
        } else {
            onFavorite({ id, orgId }).catch(() => { toast.error("Error to favorite project")});
        }
    }

    return (
        <Link href={`/project/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Overlay />
                    <Actions id={id} title={title} side="right">
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </button>
                        </Actions>
                </div>
                <Footer
                    isFavorite={isfavourite}
                    title={title}
                    creatorLabel={creatorLabel}
                    createdAtLabel={creationTime}
                    onClick={ToggleFavorite}
                    disabled={PendingFavorite || PendingUnfavorite}
                />
            </div>
        </Link>
    )
}
ProjectCard.Skeleton = function ProjectCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    )
}