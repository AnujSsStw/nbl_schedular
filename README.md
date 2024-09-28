the sheet name should be data and the header must be already set to
`PLAYER	MIN	2M	2A	3M	3A	FG%	1M	1A	1%	Or	Dr	Reb	Ast	To	Stl	Blk	Fo	Pts	Plus/Minus	Eff	Team	Match	Win/Loss	Date	Session`

NOTE: nodejs or bun should be installed

setup:

- 1. run `npm i` or `bun i`
- 2. run `npx convex dev` or `bunx convex dev` if not login it will tell you to login in convex
- 3. after running above cmd it will ask to select a project or create a new one. Choose which one is applied to you.

setup the env's in convex project:

- 1. head over the https://dashboard.convex.dev/{project}/settings/environment-variables or navigate to the your Project -> Settings -> Environment Variables
- 2. copy the env from your .env which you created with the help of .env.example (copy because it will automatically remove the new line in GOOGLE_PRIVATE_KEY) and paste it into the form it will auto format it.

Now just head over to function Functions -> scheduler:create_nba_schedule -> Run Function

{
year: 2024
}

-> Run Action
