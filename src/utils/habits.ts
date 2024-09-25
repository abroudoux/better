import type { Habit } from "$utils/types/entities";

export function getProgressHabits(habits: Habit[]): number {
	const completedHabits = habits.reduce((acc, habit) => {
		return habit.isCompleted ? acc + 1 : acc;
	}, 0);
	const progress = (completedHabits * 100) / habits.length;

	return progress;
}
