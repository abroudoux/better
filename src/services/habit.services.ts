import type { Habit } from "$utils/types/entities";
import { db } from "$lib/db/client";
import { habits } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export async function getAllHabits(): Promise<Habit[]> {
	const result = await db.query.habits.findMany();

	return result as Habit[];
}

export async function getHabitById(id: string): Promise<Habit | null> {
	const result = await db.select().from(habits).where(eq(habits.id, id)).limit(1);
	return (result[0] as Habit) || null;
}
