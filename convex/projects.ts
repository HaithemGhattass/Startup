import { v } from 'convex/values'
import { query } from './_generated/server'
export const get = query({
    args: {
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {throw new Error("Unauthorized");}
        const projects = await ctx.db.query('projects')
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