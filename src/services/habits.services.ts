import type { Habit } from "$utils/types/entities";
import type { HabitRequest } from "$utils/types/services";

export async function getAllHabits(fetch: typeof global.fetch): Promise<Habit[] | Error> {
	try {
		const response = await fetch("/api/habits");

		if (response.status === 404) {
			throw new Error("No habits found");
		} else if (!response.ok) {
			throw new Error(`Failed to fetch habits: ${response.statusText}`);
		}

		const habits: Habit[] = await response.json();

		//! DEBUG
		console.log("habits from getAllHabits service:", habits);

		return habits;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error during getAllHabits service:", error.message);
			throw new Error("Failed during getAllHabits service");
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unexpected error occurred");
		}
	}
}

export async function getHabitById(fetch: typeof global.fetch, id: string): Promise<Habit> {
	try {
		const response = await fetch(`/api/habits/${id}`);

		if (response.status === 404) throw new Error("Habit not found");
		if (!response.ok) throw new Error("Failed to fetch habit");

		const habit: Habit = await response.json();

		//! DEBUG
		console.log("Habit from getHabitById service:", habit);

		return habit;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error during getHabitById service:", error.message);
			throw new Error("Error during getHabitById service");
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unexpected error occurred");
		}
	}
}

export async function postHabit(
	fetch: typeof global.fetch,
	habit: HabitRequest
): Promise<Habit | Error> {
	try {
		const response = await fetch("/api/habits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name: habit.name })
		});

		if (!response.ok) throw new Error("Failed to create habit");

		const newHabit: Habit = await response.json();

		//! DEBUG
		console.log("newHabit from postHabi service:", newHabit);

		return newHabit;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error during postHabit service:", error.message);
			throw new Error("Failed during postHabit service");
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unexpected error occurred");
		}
	}
}

export async function toggleHabitStatus(
	fetch: typeof global.fetch,
	id: string
): Promise<Habit | Error> {
	try {
		const response = await fetch(`/api/habits/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		});

		if (response.status === 404) throw new Error("Habit not found");
		if (!response.ok) throw new Error("Failed to update habit");

		const habit: Habit = await response.json();

		//! DEBUG
		console.log("habit from toggleHabitStatus service:", habit);

		return habit;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error during toggleHabitStatus service:", error.message);
			throw new Error("Failed during toggleHabitStatus service");
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unexpected error occurred");
		}
	}
}

export async function deleteHabit(fetch: typeof global.fetch, id: string): Promise<Habit | Error> {
	try {
		const response = await fetch(`/api/habits/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		});

		if (response.status === 404) throw new Error("Habit not found");
		if (!response.ok) throw new Error("Failed to delete habit");

		const habit: Habit = await response.json();

		//! DEBUG
		console.log("habit from deleteHabit service:", habit);

		return habit;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error during deleteHabit service:", error.message);
			throw new Error("Failed during deleteHabit service");
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unexpected error occurred");
		}
	}
}
