import "dotenv/config";

import { db, connection } from "$lib/db/client";
import { habits } from "$lib/db/schema";
import { habitsTest } from "$utils/constants";

await db.insert(habits).values(habitsTest).execute();

await connection.end();
