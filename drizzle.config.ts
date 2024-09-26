import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) throw new Error("DATABASE_URL is not set");

export default defineConfig({
	schema: "src/lib/db/schema.ts",
	out: "src/lib/db/drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: dbUrl
	}
});
