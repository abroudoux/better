import type { LayoutServerLoad } from "./$types";

import { getAllHabits } from "$lib/services/habits.services";
import type { Habit } from "$lib/utils/types/entities";

export const load: LayoutServerLoad = async ({ fetch }: { fetch: typeof global.fetch }) => {
	try {
		const result = await getAllHabits(fetch);
		const habits: Habit[] = result;

		return {
			habits
		};
	} catch (error: unknown) {
		console.error(typeof Error ? (error as Error).message : error);
		return {
			status: 500,
			error: new Error(typeof Error ? String((error as Error).message) : String(error))
		};
	}
};
