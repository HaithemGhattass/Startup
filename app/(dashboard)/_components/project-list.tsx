"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EmptyFavorites } from "./EmptyFavorites";
import { EmptyProjects } from "./EmptyProjects";
import { EmptySearch } from "./EmptySearch";
import { ProjectCard } from "./ProjectCard";
import { NewProjectButton } from "./new-board-button";

interface ProjectListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
    onSelectProject: (projectId: string) => void;
};
export const ProjectList = ({ orgId, query, onSelectProject }: ProjectListProps) => {
    const data = useQuery(api.projects.get, { orgId, ...query });
    
    if (data === undefined) return (
 
            <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorites Projects" : "Team Projects"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewProjectButton orgId={orgId} disabled />
                <ProjectCard.Skeleton />
                <ProjectCard.Skeleton />
                <ProjectCard.Skeleton />
                 <ProjectCard.Skeleton />
            </div>
            </div>
          
            );
    if (!data?.length && query.search) {
        return (
           <EmptySearch />
        )
    }
    if (!data?.length && query.favorites) {
        return (
            <EmptyFavorites />
        )
    }
    if (!data?.length) {
        return (
            <EmptyProjects />
        )
    }
    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorites Projects" : "Team Projects"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewProjectButton
                    orgId={orgId}
                    
                />
                {data.map((project) => (
                    <ProjectCard
                        key={project._id}
                        id={project._id}
                        title={project.title}
                        creatorId={project.creatorId}
                        creatorName={project.creatorName}
                        creationDate={project._creationTime}
                        orgId={project.orgId}
                        isfavourite={project.isFavorite}
                        onClick={() => onSelectProject(project._id)}
                    />
                ))}
                </div>
        </div>
    );
}