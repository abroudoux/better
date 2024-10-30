import type { PageServerLoad } from "./$types";

import { getTrainingById } from "$services/trainings.services";
import type { Training } from "$utils/types/entities";

export const load: PageServerLoad = async ({
	params,
	fetch
}: {
	params: { name: string };
	fetch: typeof global.fetch;
}) => {
	try {
		const result = await getTrainingById(params.name, fetch);
		const training: Training = result;

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Training {+page.server.ts}:", training);

		return {
			training
		};
	} catch (error: unknown) {
		console.error(typeof Error ? (error as Error).message : error);
		return {
			status: 500,
			error: new Error(typeof Error ? String((error as Error).message) : String(error))
		};
	}
};
