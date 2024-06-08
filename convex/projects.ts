import { v } from 'convex/values'
import { query } from './_generated/server'
import {getAllOrThrow} from 'convex-helpers/server/relationships';
import { favorite } from './project';
export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) { throw new Error("Unauthorized"); }
        if (args.favorites) {
            const favoritedProjects = await ctx.db.query('userFavorites').withIndex("by_user_org", (q) =>
                q.eq("userId", identity.subject).eq("orgId", args.orgId)
            ).order("desc").collect();
            const ids = favoritedProjects.map((p) => p.projectId);
            const projects = await getAllOrThrow(ctx.db, ids);
            return projects.map((project) => {
                return {
                    ...project,
                    isFavorite: true
                }
            });

        }
        const title = args.search as string; 
        let projects = [];
        if (title) {
            projects = await ctx.db.query('projects')
                .withSearchIndex("search_title", (q) => q.search("title", title).eq("orgId", args.orgId))
                .collect();
        }else 
        projects = await ctx.db.query('projects')
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect();
        const projectsWithFavoritesRelation = projects.map(async (project) => {
            return ctx.db.query('userFavorites').withIndex("by_user_project", (q) =>
                q.eq("userId", identity.subject).eq("projectId", project._id)
            ).unique().then((favorite) => {
                return {
                    ...project,
                    isFavorite: !!favorite
                }
            });
        });
        const projectsWithFavoritesBoolean = Promise.all(projectsWithFavoritesRelation);
        return projectsWithFavoritesBoolean;
    }
})