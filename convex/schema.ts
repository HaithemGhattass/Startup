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
    })
});