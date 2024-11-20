import type { Habit } from "$lib/utils/types/entities";

export type HabitRequest = Pick<Habit, "name">;

export type IsNewDayResponse = {
	isNewDay: boolean;
	dayId?: string | undefined;
};
