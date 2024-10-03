import type { Day, Habit } from "$utils/types/entities";
import type { IsNewDayResponse } from "$utils/types/services";

export async function isNewDay(fetch: typeof global.fetch): Promise<IsNewDayResponse | Error> {
	try {
		const response = await fetch("/api/days");

		if (!response.ok) throw new Error("Failed to check if new day");

		const result = await response.json();
		const isNewDay = result.isNewDay;
		const dayId = result.today?.id;

		//! DEBUG
		console.log("isNewDay from isNewDay service:", isNewDay);

		return {
			isNewDay,
			dayId
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error during isNewDay service:", error.message);
			throw new Error("Failed during isNewDay service");
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unexpected error occurred");
		}
	}
}

export async function postNewDay(
	fetch: typeof global.fetch,
	habits: Habit[]
): Promise<Day | Error> {
	try {
		const response = await fetch("/api/days", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ habits })
		});

		if (!response.ok) throw new Error("Failed to create new day");

		const newDay: Day = await response.json();

		//! DEBUG
		console.log("newDay from postNewDay service:", newDay);

		return newDay;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error during postNewDay service:", error.message);
			throw new Error("Failed during postNewDay service");
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unexpected error occurred");
		}
	}
}

export async function putDay(
	fetch: typeof global.fetch,
	dayId: string,
	habits: Habit[]
): Promise<Day | Error> {
	try {
		const response = await fetch(`/api/days/${dayId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ habits })
		});

		if (!response.ok) throw new Error("Failed to edit day");

		const editedDay: Day = await response.json();

		//! DEBUG
		console.log("editedDay from putDay service:", editedDay);

		return editedDay;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error during putDay service:", error.message);
			throw new Error("Failed during putDay service");
		} else {
			console.error("Unexpected error:", error);
			throw new Error("An unexpected error occurred");
		}
	}
}
