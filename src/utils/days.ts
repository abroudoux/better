import { isNewDay, createNewDay, editDay } from "$services/days.services";
import { getAllHabits } from "$services/habit.services";
import type { Habit } from "$utils/types/entities";

export function getDate() {
	return new Date().toISOString().slice(0, 10);
}

export async function manageDay() {
	const response = await isNewDay(fetch);
	const habits: Habit[] = await getAllHabits(fetch);

	if (response.isNewDay) {
		const newDay = await createNewDay(fetch, habits);
		for (const habit of habits) {
			habit.isCompleted = false;
		}
		return newDay;
	} else if (response.dayId) {
		const editedDay = await editDay(fetch, response.dayId, habits);
		return editedDay;
	}
}
