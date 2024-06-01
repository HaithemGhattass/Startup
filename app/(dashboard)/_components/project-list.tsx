import { EmptyFavorites } from "./EmptyFavorites";
import { EmptyProjects } from "./EmptyProjects";
import { EmptySearch } from "./EmptySearch";

interface ProjectListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: boolean;
    };
};
export const ProjectList = ({ orgId, query }: ProjectListProps) => {
    const data = []; // TODO : Change to API call
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
            {JSON.stringify(query)}
        </div>
    );
}