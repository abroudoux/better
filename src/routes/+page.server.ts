import type { PageServerLoad } from "./$types";

import { getAllHabits } from "$services/habit.services";
import type { Habit } from "$utils/types/entities";

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const habits: Habit[] = await getAllHabits(fetch);

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
