import { v } from 'convex/values'
import { defineSchema, defineTable } from 'convex/server'
export default defineSchema({
    projects: defineTable({
        title: v.string(),
        orgId: v.string(),
        creatorId: v.string(),
        creatorName: v.string(),
    })
        .index("by_org", ["orgId"])
        .searchIndex("search_title", {
            searchField: "title",
            filterFields: ["orgId"]
        }),
    userFavorites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        projectId: v.id("projects"),
    })
        .index("by_project", ["projectId"])
        .index("by_user_org", ["userId", "orgId"])
        .index("by_user_project", ["userId", "projectId"])
        .index("by_user_project_org", ["userId", "projectId", "orgId"])
});
