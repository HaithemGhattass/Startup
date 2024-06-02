"use client"
import { Navbar } from "./_components/navbar";
import { OrganizationsSidebar } from "./_components/organizationsSidebar";
import { Sidebar } from "./_components/sidebar";
interface DashboardLayoutProps {
    children: React.ReactNode
};
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className="h-full">
            <Sidebar />
            <div className="pl-[60px] h-full">          
                <div className="flex gap-x-3 h-full">
                    <OrganizationsSidebar />
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                    
                </div>
            </div>
        </main>
    );
};
export default DashboardLayout;