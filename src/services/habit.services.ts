import type { Habit } from "$utils/types/entities";
import type { HabitRequest } from "$utils/types/services";

export async function getAllHabits(fetch: typeof global.fetch): Promise<Habit[]> {
	try {
		const response = await fetch("/api/habits");

		if (!response.ok) throw new Error("Failed to fetch habits");

		const habits: Habit[] = await response.json();

		return habits;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during getAllHabits service");
	}
}

export async function getHabitById(fetch: typeof global.fetch, id: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${id}`);

		if (!response.ok) throw new Error("Failed to fetch habit");

		const habit: Habit = await response.json();

		return habit;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during getHabitById service");
	}
}

export async function postHabit(fetch: typeof global.fetch, habit: HabitRequest): Promise<Habit> {
	try {
		const response = await fetch("/api/habits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name: habit.name })
		});

		if (!response.ok) throw new Error("Failed to create habit");

		const newHabit = await response.json();

		return newHabit as Habit;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during postHabit service");
	}
}

export async function toggleHabitStatus(fetch: typeof global.fetch, id: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		});

		if (!response.ok) throw new Error("Failed to update habit");

		const habit = await response.json();

		return habit as Habit;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during toggleHabitStatus service");
	}
}

export async function deleteHabit(fetch: typeof global.fetch, id: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		});

		if (!response.ok) throw new Error("Failed to delete habit");

		const habit = await response.json();

		return habit as Habit;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during deleteHabit service");
	}
}
