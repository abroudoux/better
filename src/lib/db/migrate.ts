import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db, connection } from "$lib/db/client";

await migrate(db, {
	migrationsFolder: "src/lib/db/drizzle"
});

await connection.end();
