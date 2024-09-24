import type { User } from "$utils/types/entities";

export interface ServiceResponse<T> {
	data: T | null;
	error: string | null;
}

export type RegisterUser = Pick<User, "name" | "firstName" | "email" | "password">;
export type LoginUser = Pick<User, "email" | "password">;
