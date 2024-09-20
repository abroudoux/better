import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("Database URL not found");
}

const client = postgres(databaseUrl);
export const db = drizzle(client, {});
