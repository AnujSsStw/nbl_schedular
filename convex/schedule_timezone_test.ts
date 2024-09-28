import { internal } from "./_generated/api";
import { action, mutation } from "./_generated/server";
import { baseUrl, convertToDatetime, getSchedule } from "./utils";

export const schedule_timezone_test = action({
  args: {},
  handler: async (ctx, {}) => {
    const schedule = await getSchedule(
      `${baseUrl}/basketball/league/226/australia-nbl/schedule/2024`
    );
    if (schedule === null) {
      console.log("Failed to retrieve schedule");
      return;
    }

    const year = 2024;
    let delay = 0;
    for (const game of schedule) {
      if (game.date == "2024-09-28") {
        // console.log(game);

        const date = convertToDatetime(`${game.date},${game.time}`) as number;

        console.log(date, Date.now());

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
        break;
      }
    }
  },
});
