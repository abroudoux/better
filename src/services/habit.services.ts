import type { Habit } from "$utils/types/entities";
import { db } from "$lib/db/client";
import { habits } from "$lib/db/schema";

export async function getAllHabits(): Promise<Habit[]> {
	const result = await db.query.habits.findMany();

	return result as Habit[];
}

export async function toggleHabitStatus(habitId: string) {}
