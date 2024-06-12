import { cn } from "@/lib/utils";
import { NewProjectButton } from "../new-board-button";
import { Plus , ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { on } from "events";

interface ProjectDetailsProps {
    projectId: string;
    onBack: () => void;
};

export const ProjectDetails = ({ projectId, onBack }: ProjectDetailsProps) => {
    // Fetch project details based on projectId...
    useEffect(() => {
        if (!projectId) {
            onBack();
        }
   }, [])
    return (
        <div>
           <div className="flex items-center  ">
                <ArrowLeft className="cursor-pointer" onClick={onBack} /> 
                <h2 className="ml-4 text-xl font-light">Back</h2>
                </div>
            <div>
            <h2 className="text-3xl mt-4">
                Boards
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <button
            
            onClick={()=>{}}
            className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6")}
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-xs text-white font-light">
             New Board
            </p>
        </button>
                {/* <ProjectCard.Skeleton />
                <ProjectCard.Skeleton />
                <ProjectCard.Skeleton />
                 <ProjectCard.Skeleton /> */}
                    
            </div>
            </div>
            <div>
            <h2 className="text-3xl mt-4">
                Notes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <button
            
            onClick={()=>{}}
            className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6")}
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-xs text-white font-light">
             New Note
            </p>
        </button>
                {/* <ProjectCard.Skeleton />
                <ProjectCard.Skeleton />
                <ProjectCard.Skeleton />
                 <ProjectCard.Skeleton /> */}
                    
            </div>
            </div>
        </div>
    );
}
