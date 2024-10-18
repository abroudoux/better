import { isNewDay, postNewDay, putDay } from "$services/days.services";
import { getAllHabits } from "$services/habits.services";
import type { Habit } from "$utils/types/entities";

export function getDate() {
	return new Date().toISOString().slice(0, 10);
}

export async function manageDay() {
	const response = await isNewDay(fetch);
	const habits: Habit[] = await getAllHabits(fetch);

	if (response.isNewDay) {
		const newDay = await postNewDay(fetch, habits);
		console.log("New day created:", newDay);
		for (const habit of habits) {
			habit.isCompleted = false;
		}
		return newDay;
	} else if (response.dayId) {
		const editedDay = await putDay(fetch, response.dayId, habits);
		return editedDay;
	}
}
