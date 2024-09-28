"use node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { convertToDatetime, getPlayerStats } from "./utils";
import { update_sheet } from "./sheets";
import { internal } from "./_generated/api";

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
      // Retry with a higher delay
      const date = convertToDatetime(
        `${args.date},${args.time}`,
        "timestamp",
        24
      ) as number;
      await ctx.scheduler.runAfter(date, internal.update_sheets.send, args);
      return "Failed to retrieve stats so schedule a retry with higher delay";
    }

    try {
      await update_sheet(stats, args.year);
    } catch (error) {
      console.error("Error at the upadte_sheets function:", error);
    }

    return "Done";
  },
});
