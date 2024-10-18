import type { Habit } from "$utils/types/entities";
import type { HabitRequest } from "$utils/types/services";

export async function getAllHabits(fetch: typeof global.fetch): Promise<Habit[]> {
	try {
		const response = await fetch("/api/habits", { method: "GET" });

		if (!response.ok)
			throw new Error(`Failed to fetch habits: ${response.statusText || "Unknown error"}`);

		const habits = await response.json();

		if (!Array.isArray(habits))
			throw new Error("Invalid response structure: Expected an array of habits");

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Habits {getAllHabits service}:", habits);

		return habits as Habit[];
	} catch (error: unknown) {
		console.error("Error {getAllHabits}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function getHabitById(fetch: typeof global.fetch, id: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${id}`, { method: "GET" });

		if (!response.ok)
			throw new Error(`Failed to fetch habit: ${response.statusText || "Unknown error"}`);

		const habit: Habit = await response.json();

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Habits {getHabitById service}:", habit);

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

		if (!response.ok)
			throw new Error(`Failed to create habit: ${response.statusText || "Unknown error"}`);

		const habitCreated: Habit = await response.json();

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Habits {postHabit service}:", habitCreated);

		return habitCreated;
	} catch (error: unknown) {
		console.error("Error {postHabit}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function toggleHabitStatus(fetch: typeof global.fetch, id: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${id}`, {
			method: "PUT",
			body: JSON.stringify({ id })
		});

		if (!response.ok)
			throw new Error(`Failed to update habit: ${response.statusText || "Unknown error"}`);

		const habitUpdated: Habit = await response.json();

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Habits {toggleHabitStatus service}:", habitUpdated);

		return habitUpdated;
	} catch (error: unknown) {
		console.error("Error {toggleHabitStatus}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function deleteHabit(fetch: typeof global.fetch, id: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${id}`, {
			method: "DELETE",
			body: JSON.stringify({ id })
		});

		if (!response.ok)
			throw new Error(`Failed to delete habit: ${response.statusText || "Unknown error"}`);

		const habitDeleted: Habit = await response.json();

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Habits {deleteHabit service}:", habitDeleted);

		return habitDeleted;
	} catch (error: unknown) {
		console.error("Error {deleteHabit}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}
