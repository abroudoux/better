import type { PageServerLoad } from "./$types";

import { db } from "$lib/db/db.server";
import { tableTest } from "$lib/db/schemas";

export const load = (async () => {
	const result = await db.select().from(tableTest);
	return {
		result
	};
}) satisfies PageServerLoad;
