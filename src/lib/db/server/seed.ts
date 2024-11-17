import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { habitsTable } from "$lib/db/server/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error("DATABASE_URL is not set");

const sql = postgres(databaseUrl);
const db = drizzle(sql);

async function seedDatabase() {
	await db
		.insert(habitsTable)
		.values([
			{
				id: "0",
				name: "Drink water",
				isCompleted: false
			},
			{
				id: "1",
				name: "Read",
				isCompleted: false
			},
			{
				id: "2",
				name: "Exercise",
				isCompleted: false
			}
		])
		.execute();

	console.log("Habits seeded");
}

seedDatabase().catch((error) => {
	throw new Error(error.message);
});
