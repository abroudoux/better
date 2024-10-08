import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db, connection } from "$lib/db/server/client";

await migrate(db, {
	migrationsFolder: "src/lib/db/server/drizzle"
});

await connection.end();
