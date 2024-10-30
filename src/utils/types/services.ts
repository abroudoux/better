import type { Habit, Training } from "$utils/types/entities";

export type HabitRequest = Pick<Habit, "name">;

export type IsNewDayResponse = {
	isNewDay: boolean;
	dayId?: string | undefined;
};

export type TrainingRequest = Pick<Training, "name">;
