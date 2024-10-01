import type { User, Habit } from "$utils/types/entities";

export interface ServiceResponse<T> {
	data: T | null;
	error: string | null;
}

export type HabitRequest = Pick<Habit, "name">;

export type IsNewDayResponse = {
	isNewDay: boolean;
	dayId?: string | undefined;
};
