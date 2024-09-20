import type { PageServerLoad } from "./$types";

import { db } from "$lib/db";
import { tableTest } from "$lib/db/schema";

export const load = (async () => {
	const result = await db.select().from(tableTest);
	return {
		result
	};
}) satisfies PageServerLoad;
