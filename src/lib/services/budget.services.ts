import type { SourceBudget } from "$lib/utils/types/entities";

export async function getAllSourcesBudgets(fetch: typeof global.fetch): Promise<SourceBudget[]> {
	try {
		const response = await fetch("/api/budget", { method: "GET" });

		if (!response.ok) throw new Error("Failed to fetch budget {getAllBudget service}");

		const sourcesBudgets: SourceBudget[] = await response.json();

		return sourcesBudgets;
	} catch (error: unknown) {
		console.error("Error {getAllBudget}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}

export async function postSourceBudget(
	fetch: typeof global.fetch,
	sourceBudget: SourceBudget
): Promise<SourceBudget> {
	try {
		const response = await fetch("/api/budget", {
			method: "POST",
			body: JSON.stringify(sourceBudget)
		});

		if (!response.ok) throw new Error("Failed to create source budget {postSourceBudget service}");

		const sourceBudgetCreated: SourceBudget = await response.json();

		return sourceBudgetCreated;
	} catch (error: unknown) {
		console.error("Error {postSourceBudget}:", error instanceof Error ? error.message : error);
		throw error instanceof Error ? error : new Error("An unexpected error occurred");
	}
}
