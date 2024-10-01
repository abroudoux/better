import type { Day, Habit } from "$utils/types/entities";
import type { IsNewDayResponse } from "$utils/types/services";

export async function isNewDay(fetch: typeof global.fetch): Promise<IsNewDayResponse> {
	try {
		const response = await fetch("/api/days");

		if (!response.ok) {
			throw new Error("Failed to check if new day");
		}

		const result = await response.json();
		const isNewDay = result.isNewDay;
		const dayId = result.today?.id;

		return {
			isNewDay,
			dayId
		};
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during isANewDay service");
	}
}

export async function createNewDay(fetch: typeof global.fetch, habits: Habit[]): Promise<Day> {
	try {
		const response = await fetch("/api/days", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ habits })
		});

		if (!response.ok) throw new Error("Failed to create new day");

		const newDay = await response.json();
		console.log("New day created:", newDay);

		return newDay as Day;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during createNewDay service");
	}
}

export async function editDay(
	fetch: typeof global.fetch,
	dayId: string,
	habits: Habit[]
): Promise<Day> {
	try {
		const response = await fetch(`/api/days/${dayId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ habits })
		});

		if (!response.ok) throw new Error("Failed to edit day");

		const editedDay = await response.json();

		return editedDay as Day;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during editDay service");
	}
}
