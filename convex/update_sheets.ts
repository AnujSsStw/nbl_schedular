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
    console.log("Args:", args);

    if (!stats) {
      return "Failed to retrieve stats";
    }

    try {
      await update_sheet(stats, args.year);
    } catch (error) {
      console.error("Error at the upadte_sheets function:", error);
      console.log("Retrying in 24 hours with stats:", stats);
      // Retry with a higher delay
      const date = convertToDatetime(
        `${args.date},${args.time}`,
        "timestamp",
        1
      ) as number;
      console.log(date);

      await ctx.scheduler.runAt(date, internal.update_sheets.send, args);
    }

    return "Done";
  },
});
