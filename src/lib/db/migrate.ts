import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";

import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) throw new Error("Cannot migrate. DATABASE_URL is not set");

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const db = drizzle(pool);

async function main() {
	console.log("Running your migrations...");
	await migrate(db, { migrationsFolder: "drizzle" });
	console.log("Woohoo! Migrations completed!");
	return;
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
