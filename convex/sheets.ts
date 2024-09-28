"use node";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetCell,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { JWT } from "google-auth-library";

// the params is going to be an 2d array of values with i=0 being the header and i=1 being the values
export async function update_sheet(
  stats: string[][],
  title: string,
  year: number
): Promise<void> {
  // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
    key: process.env.GOOGLE_PRIVATE_KEY as string,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SPREADSHEET_ID as string,
    serviceAccountAuth
  );

  await doc.loadInfo(); // loads document properties and worksheets

  // removing the 2, 3, 4nd pts column as it is a duplicate from all the other columns
  for (let i = 0; i < stats.length; i++) {
    stats[i].splice(1, 3);
  }

  // stats[0][stats[0].length - 6] = "Plus/Minus";
  const data = doc.sheetsByTitle["data"];

  const newData: string[][] = [];

  for (let i = 1; i < stats.length; i++) {
    const [twoM, twoA] = stats[i][2].split("-");
    const [threeM, threeA] = stats[i][3].split("-");
    const [oneM, oneA] = stats[i][5].split("-");

    newData.push([
      stats[i][0], // PLAYER
      stats[i][1], // MIN
      twoM, // 2M
      twoA, // 2A
      threeM, // 3M
      threeA, // 3A
      stats[i][4], // FG%
      oneM, // 1M
      oneA, // 1A
      ...stats[i].slice(6, 22), // Remaining columns (Or to Win/Loss)
      year.toString(), // Date Session
    ]);
  }
  console.log(newData[1]);
  stats = [];

  try {
    // comment out the following line as assuming the sheet already exists with the correct headers
    // create a new sheet if it doesn't exist
    // if (!data) {
    //   console.log("Sheet not found: creating new sheet");
    //   await doc.addSheet({
    //     title: "data",
    //     headerValues: stats[0],
    //   });
    // }

    // add the values
    for (let i = 0; i < newData.length; i++) {
      await data.addRow(newData[i]);
    }

    // save it
    await data.saveUpdatedCells();
  } catch (error) {
    console.log(error);
  }
}
