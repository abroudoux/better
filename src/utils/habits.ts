import type { Habit } from "$utils/types/entities";

export function resetAllHabitsStatus(habits: Habit[]): Habit[] {
	return habits.map((habit) => {
		habit.isCompleted = false;
		return habit;
	});
}
