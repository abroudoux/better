import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { habitsTable, daysTable } from "$lib/db/server/schema";
import { habitsDataTest } from "$utils/constants";
import type { Habit, Day } from "$utils/types/entities";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error("DATABASE_URL is not set");

const sql = postgres(databaseUrl);
const db = drizzle(sql);

async function seed() {
	try {
		const insertedHabits: Habit[] = await db.insert(habitsTable).values(habitsDataTest).execute();
		const seedDay: Day = {
			id: "0",
			date: "2021-09-01",
			habits: insertedHabits,
			habitsNum: insertedHabits.length,
			habitsCompleted: 0,
			percentage: 0
		};
		const insertedDays: Day[] = await db.insert(daysTable).values(seedDay).execute();
		const insertedData = { insertedHabits, insertedDays };
		console.log("Inserted data:", insertedData);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			throw new Error(error.message);
		} else {
			console.error("An error occurred while seeding the database");
			throw new Error("An error occurred while seeding the database");
		}
	} finally {
		sql.end();
	}
}

seed();
