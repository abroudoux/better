import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error("DATABASE_URL is not set <<drizzle.config.ts>>");

export default defineConfig({
	schema: "src/lib/db/server/schema.ts",
	out: "src/lib/db/server/drizzle",
	dialect: "sqlite",
	dbCredentials: {
		url: databaseUrl
	},
	verbose: true,
	strict: true
});
