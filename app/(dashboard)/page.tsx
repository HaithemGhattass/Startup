"use client";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrganization } from "./_components/EmptyOrganization";
import { ProjectList } from "./_components/project-list";
interface DashboardPageProps {
    searchParams: {
        search?: string,
        favorites?: boolean
    }
};
const DashboardPage = ({searchParams} : DashboardPageProps) => {
    const { organization } = useOrganization();
    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {!organization ?<EmptyOrganization /> : <ProjectList orgId={organization.id} query={searchParams} />}
           
        </div>
    );
}
export default DashboardPage;