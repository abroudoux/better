import type { Habit } from "$utils/types/entities";
import type { HabitRequest } from "$utils/types/services";

export async function getAllHabits(fetch: typeof global.fetch): Promise<Habit[]> {
	try {
		const response = await fetch("/api/habits", { method: "GET" });

		if (!response.ok) throw new Error("Failed to fetch habits {getAllHabits service}");

		const habits: Habit[] = await response.json();

		return habits as Habit[];
	} catch (error: unknown) {
		console.error("Error {getAllHabits}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function getHabitById(fetch: typeof global.fetch, habitId: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${habitId}`, { method: "GET" });

		if (!response.ok) throw new Error("Failed to fetch habit {getHabitById service}");

		const habit: Habit = await response.json();

		return habit;
	} catch (error: unknown) {
		console.error("Error {getHabitById}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function postHabit(fetch: typeof global.fetch, habit: HabitRequest): Promise<Habit> {
	try {
		const response = await fetch("/api/habits", {
			method: "POST",
			body: JSON.stringify({ name: habit.name })
		});

		if (!response.ok) throw new Error("Failed to create habit {postHabit service}");

		const habitCreated: Habit = await response.json();

		return habitCreated;
	} catch (error: unknown) {
		console.error("Error {postHabit}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function toggleHabitStatus(
	fetch: typeof global.fetch,
	habitId: string
): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${habitId}`, {
			method: "PUT",
			body: JSON.stringify({ habitId })
		});

		if (!response.ok) throw new Error("Failed to update habit status");

		const habitUpdated: Habit = await response.json();

		return habitUpdated;
	} catch (error: unknown) {
		console.error("Error {toggleHabitStatus}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function toggleAllHabitsStatus(
	fetch: typeof global.fetch,
	habits: Habit[]
): Promise<Habit[]> {
	try {
		const response = await fetch("/api/habits/reset", {
			method: "POST"
		});

		if (!response.ok) throw new Error("Failed to update all habits status");

		const habitsUpdated: Habit[] = await response.json();

		console.log("habitsUpdated from toggleAllHabitsStatus:", habitsUpdated);

		return habits as Habit[];
	} catch (error: unknown) {
		console.error("Error {toggleAllHabitsStatus}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function deleteHabit(fetch: typeof global.fetch, habitId: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${habitId}`, {
			method: "DELETE",
			body: JSON.stringify({ habitId })
		});

		if (!response.ok) throw new Error("Failed to delete habit");

		const habitDeleted: Habit = await response.json();

		return habitDeleted;
	} catch (error: unknown) {
		console.error("Error {deleteHabit}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}
