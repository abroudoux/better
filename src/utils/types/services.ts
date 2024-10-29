import type { Habit } from "$utils/types/entities";

export type HabitRequest = Pick<Habit, "name">;

export type IsNewDayResponse = {
	isNewDay: boolean;
	dayId?: string | undefined;
};
