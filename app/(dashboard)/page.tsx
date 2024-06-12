"use client";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrganization } from "./_components/EmptyOrganization";
import { ProjectList } from "./_components/project-list";
import { useState } from "react";
import { ProjectDetails } from "./_components/ProjectDetails";
interface DashboardPageProps {
    searchParams: {
        search?: string,
        favorites?: string
    }
};
const DashboardPage = ({searchParams} : DashboardPageProps) => {
    const { organization } = useOrganization();
        const [selectedProject, setSelectedProject] = useState<string | null>(null);

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
{!organization ? (
                <EmptyOrganization />
            ) : (
                selectedProject ? (
                    <ProjectDetails projectId={selectedProject} onBack={() => setSelectedProject(null)} />
                ) : (
                    <ProjectList orgId={organization.id} query={searchParams} onSelectProject={setSelectedProject} />
                )
            )}           
        </div>
    );
}
export default DashboardPage;