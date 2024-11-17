import { toast } from "svelte-sonner";

import { isNewDay, postNewDay, putDay } from "$services/days.services";
import { getAllHabits, toggleAllHabitsStatus } from "$services/habits.services";
import type { Habit } from "$utils/types/entities";

export function getDate() {
	return new Date().toISOString().slice(0, 10);
}

export async function manageDay() {
	const response = await isNewDay(fetch);
	const habits: Habit[] = await getAllHabits(fetch);

	if (response.isNewDay) {
		await postNewDay(fetch, habits);
		await toggleAllHabitsStatus(fetch, habits);
		window.location.reload();
		toast.success("New day started, another chance to improve yourself!");
	} else if (response.dayId) {
		await putDay(fetch, response.dayId, habits);
	}
}
