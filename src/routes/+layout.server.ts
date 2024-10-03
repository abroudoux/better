import type { LayoutServerLoad } from "./$types";

import { getAllHabits } from "$services/habits.services";
import type { Habit } from "$utils/types/entities";

export const load: LayoutServerLoad = async ({ fetch }: { fetch: typeof global.fetch }) => {
	try {
		const result = await getAllHabits(fetch);

		if (result instanceof Error) {
			throw result;
		}

		const habits: Habit[] = result;

		//! DEBUG
		console.log("Habits loaded from layout.server", habits);

		return {
			habits
		};
	} catch (error) {
		console.error("Error in load function:", error);
		return {
			status: 500,
			error: new Error("Failed to load habits")
		};
	}
};
