import type { PageLoad } from "./$types";

import { getAllHabits } from "$services/habit.services";
import type { Habit } from "$utils/types/entities";

export const load: PageLoad = async () => {
	const habits: Habit[] = await getAllHabits();

	return {
		habits
	};
};
