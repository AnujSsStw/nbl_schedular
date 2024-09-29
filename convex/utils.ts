import axios from "axios";
import * as cheerio from "cheerio";
import moment from "moment-timezone";

export const baseUrl = "https://www.proballers.com";

export interface Match {
  date: string;
  time: string;
  home: string;
  away: string;
  result: string;
  matchLink: string;
}

export async function getPlayerStats(match: Match): Promise<void | string[][]> {
  const link = match.matchLink;
  try {
    const response = await axios.get(link);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const tables = $("table");
      const headers = tables
        .eq(0)
        .find("thead tr:first-child th")
        .map((_, el) => $(el).text())
        .get();
      headers.push("Player Team", "Match", "Win/Loss", "Date");

      const result = match.result.split("-");
      const ans: string[][] = [headers];

      tables.each((i, table) => {
        $(table)
          .find("tbody tr")
          .each((_, row) => {
            const res: string[] = $(row)
              .find("td")
              .map((_, el) => $(el).text().trim().replace("\u202f", " "))
              .get();
            res.push(i === 0 ? match.home : match.away); // player team
            res.push(`${match.home} vs ${match.away}`); // match
            res.push(
              i === 0
                ? parseInt(result[0]) > parseInt(result[1])
                  ? "Win"
                  : "Loss"
                : parseInt(result[1]) > parseInt(result[0])
                  ? "Win"
                  : "Loss"
            ); // win/loss

            res.push(match.date); // date
            ans.push(res);
          });
      });

      return ans;
    } else {
      console.log(`Failed to retrieve page. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in getting stats:", error);
  }
}

export async function getSchedule(url: string): Promise<Match[] | null> {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const table = $("table");
      const headers = table
        .find("thead tr:first-child th")
        .map((_, el) => $(el).text())
        .get();
      headers.push("Match Link");

      const schedule: Match[] = [];

      table.find("tbody tr").each((_, row) => {
        const cells = $(row).find("td");
        const match: Partial<Match> = {};

        cells.each((i, el) => {
          const $el = $(el);
          const text = $el.text().trim().replace("\u202f", " ");

          switch (i) {
            case 0:
              match.date = moment(text, "MMM DD, YYYY").format("YYYY-MM-DD");
              break;
            case 1:
              match.time = text;
              break;
            case 2:
              match.home = text;
              break;
            case 3:
              match.away = text;
              break;
            case 4:
              match.result = text;
            case 5:
              match.matchLink = `${baseUrl}${$el.find("a").attr("href")}`;
              break;
          }
        });

        schedule.push(match as Match);
      });

      return schedule;
    } else {
      console.log(`Failed to retrieve page. Status code: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error in getting schedule:", error);
    return null;
  }
}
export function convertToDatetime(
  datetimeStr: string,
  returnType: "timestamp" | "date" = "timestamp",
  delay: number = 0
): number | Date {
  const datetimeObj = moment.tz(datetimeStr, "YYYY-MM-DD,hh:mm A", "CET");

  // Add 2 hours
  const utcDatetimeObj = datetimeObj.utc().add(delay, "day");

  // Return based on the specified type
  if (returnType === "timestamp") {
    return utcDatetimeObj.valueOf(); // Returns milliseconds since epoch
  } else {
    return utcDatetimeObj.toDate(); // Returns a JavaScript Date object
  }
}
