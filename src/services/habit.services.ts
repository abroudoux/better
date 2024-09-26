import type { Habit } from "$utils/types/entities";
import type { HabitRequest } from "$utils/types/services";

export async function getHabit(habitId: string) {
	try {
		const res = await fetch(`/api/habits/${habitId}`);

		if (!res.ok) {
			throw new Error("Failed to fetch habit");
		}

		const habit: Habit = await res.json();
		return habit;
	} catch (error: any) {
		console.error("Error fetching habit:", error);
		return null;
	}
}

export async function getAllHabits() {
	try {
		const res = await fetch("/api/habits");

		if (!res.ok) {
			throw new Error("Failed to fetch habits");
		}

		const habits: Habit[] = await res.json();

		return habits;
	} catch (error: any) {
		console.error("Error fetching habits:", error);
		return null;
	}
}

export async function postHabit(habit: HabitRequest) {
	const newHabit: Habit = {
		id: "1",
		name: habit.name,
		isCompleted: false,
		points: 10
	};

	try {
		const res = await fetch("/api/habits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newHabit)
		});

		if (!res.ok) {
			throw new Error("Failed to create habit");
		}

		const createdHabit: Habit = await res.json();
		return createdHabit;
	} catch (error: any) {
		console.error("Error creating habit:", error);
		return null;
	}
}

export async function putHabit(habitId: string) {
	try {
		const res = await fetch(`/api/habits/${habitId}`, {
			method: "PUT"
		});

		if (!res.ok) {
			throw new Error("Failed to update habit");
		}

		const updatedHabit: Habit = await res.json();
		return updatedHabit;
	} catch (error: any) {
		console.error("Error updating habit:", error);
		return null;
	}
}

export async function deleteHabit(habitId: string) {
	try {
		const res = await fetch(`/api/habits/${habitId}`, {
			method: "DELETE"
		});

		if (!res.ok) {
			throw new Error("Failed to delete habit");
		}

		return true;
	} catch (error: any) {
		console.error("Error deleting habit:", error);
		return false;
	}
}

export async function deleteAllHabits() {
	try {
		const res = await fetch("/api/habits", {
			method: "DELETE"
		});

		if (!res.ok) {
			throw new Error("Failed to delete habits");
		}

		return true;
	} catch (error: any) {
		console.error("Error deleting habits:", error);
		return false;
	}
}
