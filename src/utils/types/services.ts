import type { User, Habit } from "$utils/types/entities";

export interface ServiceResponse<T> {
	data: T | null;
	error: string | null;
}

export type RegisterUser = Pick<User, "name" | "email" | "password">;
export type LoginUser = Pick<User, "email" | "password">;

export type HabitRequest = Pick<Habit, "name">;

export type IsNewDayResponse = {
	isNewDay: boolean;
	dayId?: string | undefined;
};
