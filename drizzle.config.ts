import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export default {
	schema: "./src/lib/db/schemas/*",
	out: "./drizzle",
	dialect: "postgresql",
	driver: "pglite",
	dbCredentials: {
		url: process.env.DATABASE_URL
	}
} satisfies Config;
