import type { Habit } from "$utils/types/entities";

export async function getAllHabits(fetch: typeof global.fetch): Promise<Habit[]> {
	try {
		const response = await fetch("/api/habits");

		if (!response.ok) throw new Error("Failed to fetch habits");

		const habits = await response.json();

		return habits as Habit[];
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during getAllHabits service");
	}
}

export async function postHabit(fetch: typeof global.fetch, nameHabit: string): Promise<Habit> {
	try {
		const response = await fetch("/api/habits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name: nameHabit })
		});

		if (!response.ok) throw new Error("Failed to create habit");

		const newHabit = await response.json();

		return newHabit as Habit;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during postHabit service");
	}
}

// export async function getHabitById(habitId: string): Promise<Habit | null> {
// 	try {
// 		const response = await fetch(`/api/habits/${habitId}`);

// 		if (!response.ok) throw new Error("Failed to fetch habit");

// 		const habit = await response.json();

// 		return habit as Habit;
// 	} catch (error: any) {
// 		console.error(error.message);
// 		throw new Error("Failed during getHabitById service");
// 	}
// }

// export async function toggleHabitStatus(habitId: string) {
// 	try {
// 		const response = await fetch(`/api/habits/${habitId}`, {
// 			method: "PUT"
// 		});

// 		if (!response.ok) throw new Error("Failed to toggle habit status");

// 		return true;
// 	} catch (error: any) {
// 		console.error(error.message);
// 		throw new Error("Failed during toggleHabitStatus service");
// 	}
// }
