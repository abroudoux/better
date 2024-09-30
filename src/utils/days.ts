import { isNewDay, createNewDay, editDay } from "$services/day.services";
import { getAllHabits } from "$services/habit.services";
import type { Habit } from "$utils/types/entities";

export function getDate() {
	return new Date().toISOString().slice(0, 10);
}

export async function manageDay() {
	const response = await isNewDay(fetch);
	const habits: Habit[] = await getAllHabits(fetch);

	//! DEBUG
	console.log(habits);

	if (response.isNewDay) {
		const newDay = await createNewDay(fetch, habits);
		return newDay;
	} else if (response.dayId) {
		const editedDay = await editDay(fetch, response.dayId, habits);
		console.log(editedDay);
		return editedDay;
	}
}
