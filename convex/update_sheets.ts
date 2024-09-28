"use node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { getPlayerStats } from "./utils";
import { update_sheet } from "./sheets";

export const send = internalAction({
  args: {
    date: v.string(),
    time: v.string(),
    home: v.string(),
    away: v.string(),
    result: v.string(),
    matchLink: v.string(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    const stats = await getPlayerStats(args);
    if (!stats) {
      return "Failed to retrieve stats";
    }

    const title = `${args.home} vs ${args.away} ${args.date}`;
    try {
      await update_sheet(stats, title, args.year);
    } catch (error) {
      console.error("Error:", error);
    }

    return "Done";
  },
});
