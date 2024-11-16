import { isNewDay, postNewDay, putDay } from "$services/days.services";
import { getAllHabits, toggleAllHabitsStatus } from "$services/habits.services";
import type { Day, Habit } from "$utils/types/entities";

export function getDate() {
	return new Date().toISOString().slice(0, 10);
}

export async function manageDay() {
	const response = await isNewDay(fetch);
	const habits: Habit[] = await getAllHabits(fetch);

	if (response.isNewDay) {
		const dayCreated: Day = await postNewDay(fetch, habits);
		const habitsUpdated: Habit[] = await toggleAllHabitsStatus(fetch, habits);
		window.location.reload();
	} else if (response.dayId) {
		const dayUpdated: Day = await putDay(fetch, response.dayId, habits);
	}
}
