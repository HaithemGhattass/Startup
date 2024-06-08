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
export const remove = mutation({
    args: {
        id: v.id("projects"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) { throw new Error("Unauthorized"); }
        const userId = identity.subject;
        const existingFavorite = await ctx.db.query('userFavorites').withIndex("by_user_project", (q) =>
            q.eq("userId", userId).eq("projectId", args.id)
        ).unique();
        if (existingFavorite) { 
            await ctx.db.delete(existingFavorite._id);
         }
        await ctx.db.delete(args.id);
    }
});
export const update = mutation({
    args: {
        id: v.id("projects"),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) { throw new Error("Unauthorized"); }
        const title = args.title.trim();
        if (!title) { throw new Error("Title is required"); }
        if (title.length > 40) { throw new Error("Title cannt be longer than40"); }
        const project = await ctx.db.patch(args.id, { title: args.title });
        return project;
    }
});
export const favorite = mutation({
    args: { id: v.id("projects"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) { throw new Error("Unauthorized"); }
        const project = await ctx.db.get(args.id);
        if (!project) { throw new Error("Project not found"); }
        const userId = identity.subject;
        const existingFavorite = await ctx.db.query('userFavorites').withIndex("by_user_project", (q) =>
            q.eq("userId", userId).eq("projectId", project._id)
        ).unique();

        if (existingFavorite) { throw new Error("Project already favorited"); }
        await ctx.db.insert('userFavorites', {
             userId,
            projectId: project._id,
            orgId: args.orgId
        });
        return project;
    }
})
export const unfavorite = mutation({
    args: { id: v.id("projects")  },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) { throw new Error("Unauthorized"); }
        const project = await ctx.db.get(args.id);
        if (!project) { throw new Error("Project not found"); }
        const userId = identity.subject;
        const existingFavorite = await ctx.db.query('userFavorites').withIndex("by_user_project", (q) =>
            q.eq("userId", userId).eq("projectId", project._id) 
        ).unique();

        if (!existingFavorite) { throw new Error("Project not found"); }
        await ctx.db.delete(existingFavorite._id);
        return project;
    }
})
