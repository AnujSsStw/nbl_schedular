import { update_sheet } from "./convex/sheets";
import { getPlayerStats, getSchedule } from "./convex/utils";

/*

await update_sheet(
  [
    [
      "PLAYER",
      "Pts",
      "Reb",
      "Ast",
      "MIN",
      "2M-2A",
      "3M-3A",
      "FG%",
      "1M-1A",
      "1%",
      "Or",
      "Dr",
      "Reb",
      "Ast",
      "To",
      "Stl",
      "Blk",
      "Fo",
      "Pts",
      "+/-",
      "Eff",
      "Player Team",
      "Match",
      "Win/Loss",
      "Date",
    ],
    [
      "Luke Travers",
      "20",
      "8",
      "2",
      "31",
      "6-12",
      "1-3",
      "46.7%",
      "5-6",
      "83.3%",
      "5",
      "3",
      "8",
      "2",
      "1",
      "1",
      "1",
      "1",
      "20",
      "6",
      "22",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Matthew Dellavedova",
      "17",
      "6",
      "4",
      "31",
      "4-13",
      "3-7",
      "35.0%",
      "0-0",
      "-",
      "0",
      "6",
      "6",
      "4",
      "2",
      "2",
      "0",
      "3",
      "17",
      "2",
      "14",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Robert Loe",
      "9",
      "5",
      "3",
      "20",
      "2-3",
      "1-3",
      "50.0%",
      "2-2",
      "100.0%",
      "3",
      "2",
      "5",
      "3",
      "2",
      "0",
      "1",
      "2",
      "9",
      "20",
      "13",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Tanner Krebs",
      "8",
      "4",
      "1",
      "18",
      "0-3",
      "2-5",
      "25.0%",
      "2-2",
      "100.0%",
      "0",
      "4",
      "4",
      "1",
      "0",
      "0",
      "0",
      "2",
      "8",
      "12",
      "7",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Shea Ili",
      "8",
      "5",
      "0",
      "24",
      "0-6",
      "1-1",
      "14.3%",
      "5-5",
      "100.0%",
      "0",
      "5",
      "5",
      "0",
      "1",
      "0",
      "0",
      "3",
      "8",
      "12",
      "6",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Christopher Goulding",
      "7",
      "2",
      "4",
      "31",
      "2-5",
      "1-7",
      "25.0%",
      "0-0",
      "-",
      "0",
      "2",
      "2",
      "4",
      "0",
      "0",
      "0",
      "1",
      "7",
      "10",
      "4",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Ariel Hukporti",
      "5",
      "14",
      "0",
      "20",
      "2-7",
      "0-0",
      "28.6%",
      "1-2",
      "50.0%",
      "5",
      "9",
      "14",
      "0",
      "2",
      "1",
      "3",
      "4",
      "5",
      "-5",
      "15",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Kyle Bowen",
      "3",
      "4",
      "1",
      "8",
      "0-0",
      "1-1",
      "100.0%",
      "0-0",
      "-",
      "1",
      "3",
      "4",
      "1",
      "0",
      "0",
      "0",
      "2",
      "3",
      "10",
      "8",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Flynn Cameron",
      "3",
      "1",
      "2",
      "13",
      "0-2",
      "1-3",
      "20.0%",
      "0-0",
      "-",
      "1",
      "0",
      "1",
      "2",
      "1",
      "0",
      "0",
      "1",
      "3",
      "11",
      "1",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Brad Newley",
      "2",
      "0",
      "0",
      "1",
      "1-1",
      "0-0",
      "100.0%",
      "0-0",
      "-",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "2",
      "-1",
      "2",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Malith Machar",
      "0",
      "0",
      "0",
      "1",
      "0-0",
      "0-0",
      "-",
      "0-0",
      "-",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "1",
      "0",
      "-1",
      "0",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Zac Triplett",
      "0",
      "0",
      "0",
      "1",
      "0-0",
      "0-0",
      "-",
      "0-0",
      "-",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "-1",
      "0",
      "Melbourne United",
      "Melbourne United vs South East Melbourne Phoenix",
      "Win",
      "2023-09-28",
    ],
    [
      "Ben Ayre",
      "17",
      "2",
      "1",
      "30",
      "4-8",
      "2-2",
      "60.0%",
      "3-4",
      "75.0%",
      "1",
      "1",
      "2",
      "1",
      "1",
      "0",
      "0",
      "3",
      "17",
      "0",
      "14",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Will Cummings",
      "14",
      "3",
      "3",
      "28",
      "4-10",
      "0-5",
      "26.7%",
      "6-8",
      "75.0%",
      "1",
      "2",
      "3",
      "3",
      "2",
      "3",
      "1",
      "5",
      "14",
      "-13",
      "9",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Tyler Cook",
      "12",
      "7",
      "1",
      "28",
      "3-13",
      "0-0",
      "23.1%",
      "6-8",
      "75.0%",
      "3",
      "4",
      "7",
      "1",
      "2",
      "0",
      "1",
      "3",
      "12",
      "-2",
      "7",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Craig Moller",
      "9",
      "7",
      "0",
      "22",
      "1-5",
      "2-4",
      "33.3%",
      "1-2",
      "50.0%",
      "4",
      "3",
      "7",
      "0",
      "3",
      "0",
      "0",
      "3",
      "9",
      "-13",
      "6",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Mitchell Creek",
      "6",
      "9",
      "1",
      "28",
      "3-9",
      "0-3",
      "25.0%",
      "0-2",
      "0.0%",
      "1",
      "8",
      "9",
      "1",
      "1",
      "1",
      "0",
      "2",
      "6",
      "-8",
      "5",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Reuben Te Rangi",
      "4",
      "5",
      "1",
      "24",
      "1-7",
      "0-1",
      "12.5%",
      "2-2",
      "100.0%",
      "1",
      "4",
      "5",
      "1",
      "1",
      "1",
      "1",
      "3",
      "4",
      "-6",
      "4",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Owen Foxwell",
      "3",
      "0",
      "0",
      "8",
      "0-2",
      "1-1",
      "33.3%",
      "0-0",
      "-",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "3",
      "-6",
      "1",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Austin Rapp",
      "2",
      "1",
      "0",
      "1",
      "1-1",
      "0-0",
      "100.0%",
      "0-0",
      "-",
      "1",
      "0",
      "1",
      "0",
      "0",
      "0",
      "0",
      "0",
      "2",
      "0",
      "3",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Matthew Kenyon",
      "0",
      "5",
      "1",
      "16",
      "0-0",
      "0-1",
      "0.0%",
      "0-0",
      "-",
      "1",
      "4",
      "5",
      "1",
      "1",
      "0",
      "0",
      "0",
      "0",
      "-10",
      "4",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Kody Stattmann",
      "0",
      "0",
      "0",
      "1",
      "0-0",
      "0-0",
      "-",
      "0-0",
      "-",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Rhys Vague",
      "0",
      "1",
      "0",
      "8",
      "0-1",
      "0-0",
      "0.0%",
      "0-0",
      "-",
      "0",
      "1",
      "1",
      "0",
      "1",
      "0",
      "0",
      "1",
      "0",
      "-12",
      "-1",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
    [
      "Anzac Rissetto",
      "0",
      "0",
      "0",
      "5",
      "0-1",
      "0-0",
      "0.0%",
      "0-2",
      "0.0%",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "-5",
      "-3",
      "South East Melbourne Phoenix",
      "Melbourne United vs South East Melbourne Phoenix",
      "Loss",
      "2023-09-28",
    ],
  ],
  2023
);
**/

/*
console.log(
  await getSchedule(
    "https://www.proballers.com/basketball/league/226/australia-nbl/schedule"
  )
);

**/

/*
const stats = await getPlayerStats({
  away: "Illawarra Hawks",
  date: "2024-09-29",
  home: "Sydney Kings",
  matchLink:
    "https://www.proballers.com/basketball/game-preview/789829/sydney-kings-illawarra-hawks-2024-09-29",
  result: "Game preview",
  time: "3:30 AM",
});

console.log(stats);

**/
