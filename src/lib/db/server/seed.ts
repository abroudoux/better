import "dotenv/config";

import { habitsTable } from "$lib/db/server/schema";
import { db } from "$lib/db/server/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error("DATABASE_URL is not set");

async function seedDatabase() {
	await db
		.insert(habitsTable)
		.values([
			{
				name: "Drink water"
			},
			{
				name: "Read"
			},
			{
				name: "Exercise"
			}
		])
		.returning();

	console.log("Habits seeded");
}

seedDatabase().catch((error) => {
	throw new Error(error.message);
});
