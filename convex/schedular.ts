import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { baseUrl, convertToDatetime, getSchedule } from "./utils";

export const create_nba_schedule = internalAction({
  args: {
    year: v.number(),
  },
  handler: async (ctx, { year }) => {
    const s = await getSchedule(
      `${baseUrl}/basketball/league/226/australia-nbl/schedule/${year}`
    );
    if (s === null) {
      return "Failed to retrieve schedule";
    }

    let delay = 0;
    for (const game of s) {
      const date = convertToDatetime(`${game.date},${game.time}`) as number;

      // if the date is in the past, run the action immediately with a delay of 1/2 minute increment
      if (date < Date.now()) {
        await ctx.scheduler.runAfter(delay + 0, internal.update_sheets.send, {
          ...game,
          year,
        });
        delay += 30000;
      } else {
        await ctx.scheduler.runAt(date, internal.update_sheets.send, {
          ...game,
          year,
        });
      }
    }

    return "Scheduled";
  },
});
