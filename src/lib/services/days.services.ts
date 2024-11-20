import type { Day, Habit } from "$lib/utils/types/entities";
import type { IsNewDayResponse } from "$lib/utils/types/services";

export async function isNewDay(fetch: typeof global.fetch): Promise<IsNewDayResponse> {
	try {
		const response = await fetch("/api/days");

		if (!response.ok) throw new Error("Failed to check if new day");

		const result = await response.json();
		const isNewDay: boolean = result.isNewDay;
		const dayId: string = result.day?.id;

		return {
			isNewDay,
			dayId
		};
	} catch (error: unknown) {
		console.error("Error {isNewDay}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function postNewDay(fetch: typeof global.fetch, habits: Habit[]): Promise<Day> {
	try {
		const response = await fetch("/api/days", {
			method: "POST",
			body: JSON.stringify({ habits })
		});

		if (!response.ok) throw new Error("Failed to create new day");

		const dayCreated: Day = await response.json();

		console.log("dayCreated from postNewDay:", dayCreated);

		return dayCreated;
	} catch (error: unknown) {
		console.error("Error {postNewDay}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function putDay(
	fetch: typeof global.fetch,
	dayId: string,
	habits: Habit[]
): Promise<Day> {
	try {
		const response = await fetch(`/api/days/${dayId}`, {
			method: "PUT",
			body: JSON.stringify({ habits })
		});

		if (!response.ok) throw new Error("Failed to edit day");

		const dayUpdated: Day = await response.json();

		return dayUpdated;
	} catch (error: unknown) {
		console.error("Error {putDay}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}
