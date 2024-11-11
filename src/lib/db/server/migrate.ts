import "dotenv/config";

import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db, client } from "$lib/db/server/client";

await migrate(db, {
	migrationsFolder: "src/lib/db/server/drizzle"
});

client.close();
