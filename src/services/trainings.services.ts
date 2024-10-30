import type { Training } from "$utils/types/entities";
import type { TrainingRequest } from "$utils/types/services";

export async function getAllTrainings(fetch: typeof global.fetch): Promise<Training[]> {
	try {
		const response = await fetch("/api/trainings", { method: "GET" });

		if (!response.ok)
			throw new Error(`Failed to fetch trainings: ${response.statusText || "Unknown error"}`);

		const trainings = await response.json();

		if (!Array.isArray(trainings))
			throw new Error("Invalid response structure: Expected an array of trainings");

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Trainings {getAllTrainings service}:", trainings);

		return trainings as Training[];
	} catch (error: unknown) {
		console.error("Error {getAllTrainings}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function getTrainingById(fetch: typeof global.fetch, id: string): Promise<Training> {
	try {
		const response = await fetch(`/api/trainings/${id}`, { method: "GET" });

		if (!response.ok)
			throw new Error(`Failed to fetch training: ${response.statusText || "Unknown error"}`);

		const training: Training = await response.json();

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Trainings {getTrainingById service}:", training);

		return training;
	} catch (error: unknown) {
		console.error("Error {getTrainingById}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

// TODO: implement the TrainingRequest type
export async function postTraining(
	fetch: typeof global.fetch,
	training: TrainingRequest
): Promise<Training> {
	try {
		const response = await fetch("/api/trainings", {
			method: "POST",
			body: JSON.stringify({ name: training.name })
		});

		if (!response.ok)
			throw new Error(`Failed to create training: ${response.statusText || "Unknown error"}`);

		const trainingCreated: Training = await response.json();

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Trainings {postTraining service}:", trainingCreated);

		return trainingCreated;
	} catch (error: unknown) {
		console.error("Error {postTraining}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function deleteTraining(fetch: typeof global.fetch, id: string): Promise<Training> {
	try {
		const response = await fetch(`/api/trainings/${id}`, {
			method: "DELETE",
			body: JSON.stringify({ id })
		});

		if (!response.ok)
			throw new Error(`Failed to delete training: ${response.statusText || "Unknown error"}`);

		const trainingDeleted: Training = await response.json();

		//! DEBUG
		if (process.env.NODE_ENV === "development")
			console.log("Trainings {deleteTraining service}:", trainingDeleted);

		return trainingDeleted;
	} catch (error: unknown) {
		console.error("Error {deleteTraining}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}
