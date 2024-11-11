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
				id: "0",
				name: "Drink water",
				isCompleted: 0
			},
			{
				id: "1",
				name: "Read",
				isCompleted: 0
			},
			{
				id: "2",
				name: "Exercise",
				isCompleted: 0
			}
		])
		.execute();

	console.log("Habits seeded");
}

seedDatabase().catch((error) => {
	throw new Error(error.message);
});
