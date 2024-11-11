import "dotenv/config";

import { drizzle } from "drizzle-orm/libsql/web";
import { createClient } from "@libsql/client";

const databaseUrl = process.env.DATABASE_URL as string;

if (!databaseUrl) throw new Error("DATABASE_URL is not set");

export const client = createClient({ url: databaseUrl });
export const db = drizzle(client);
