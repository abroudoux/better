import type { PageServerLoad } from "./$types";

import { getAllSourcesBudgets } from "$lib/services/budget.services";
import type { SourceBudget } from "$lib/utils/types/entities";

export const load: PageServerLoad = async ({ fetch }: { fetch: typeof global.fetch }) => {
	try {
		const result = await getAllSourcesBudgets(fetch);
		const sourcesBudgets: SourceBudget[] = result;

		return {
			sourcesBudgets
		};
	} catch (error: unknown) {
		console.error(typeof Error ? (error as Error).message : error);
		return {
			status: 500,
			error: new Error(typeof Error ? String((error as Error).message) : String(error))
		};
	}
};
