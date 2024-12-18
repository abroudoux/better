import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "$lib/db/server/schema";

const connectionUrl = process.env.DATABASE_URL as string;

if (!connectionUrl) throw new Error("DATABASE_URL is not set");

export const connection = postgres(connectionUrl, {
	prepare: false
});

export const db = drizzle(connection, { schema });
