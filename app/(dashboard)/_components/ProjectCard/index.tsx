"use clien"

import Link  from "next/link"
import { Overlay } from "./overlay"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs"
import { Footer } from "./footer"
import { Skeleton } from "@/components/ui/skeleton"
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
    return (
        <Link href={`/project/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Overlay/>
                </div>
                <Footer
                    isFavorite={isfavourite}
                    title={title}
                    creatorLabel={creatorLabel}
                    createdAtLabel={creationTime}
                    onClick={() => { }}
                    disabled={false}
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