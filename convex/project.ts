import { v } from 'convex/values'
import { mutation } from './_generated/server'
export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {throw new Error("Unauthorized");}
        const project = await ctx.db.insert('projects', {
            title: args.title,
            orgId: args.orgId,
            creatorId: identity.subject,
            creatorName: identity.name!,
            
        });
        return project;
    }
})
