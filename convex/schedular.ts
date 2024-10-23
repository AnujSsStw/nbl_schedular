import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { baseUrl, convertToDatetime, getSchedule } from "./utils";

export const create_nba_schedule = internalAction({
  args: {
    year: v.number(),
    skip: v.optional(v.number()),
  },
  handler: async (ctx, { year, skip = 0 }) => {
    const scheduleUrl = `${baseUrl}/basketball/league/226/australia-nbl/schedule/${year}`;
    const schedule = await getSchedule(scheduleUrl);
    
    if (schedule === null) {
      throw new Error("Failed to retrieve schedule");
    }

    const scheduledGames = schedule.slice(skip);

    let delay = 0;
    const currentTime = Date.now();

    for (const game of scheduledGames) {
      const gameDate = convertToDatetime(
        `${game.date},${game.time}`,
        "timestamp",
        9,
        "hours"
      ) as number;

      if (gameDate < currentTime) {
        await ctx.scheduler.runAfter(delay, internal.update_sheets.send, {
          ...game,
          year,
        });
        console.log("Scheduled for immediate run:", game);
        delay += 30000; // 30 seconds
      } else {
        await ctx.scheduler.runAt(gameDate, internal.update_sheets.send, {
          ...game,
          year,
        });
        console.log("Scheduled for future run:", game);
      }
    }

    return `Scheduled ${scheduledGames.length} games`;
  },
});
