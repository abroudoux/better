import { describe, it, expect, vi, beforeEach } from "vitest";

import { isNewDay, postNewDay, putDay } from "$lib/services/days.services";
import type { Habit } from "$lib/utils/types/entities";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Day Services", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("postNewDay", () => {
		it("should return new day when the fetch is successful", async () => {
			const habits: Habit[] = [
				{ id: "1", isCompleted: false, name: "Drink water" },
				{ id: "2", isCompleted: false, name: "Read a book" }
			];
			const newDay = { id: "1", date: "2022-01-01", habits };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(newDay),
				status: 200
			});

			const result = await postNewDay(fetch, habits);

			expect(result).toEqual(newDay);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith("/api/days", {
				method: "POST",
				body: JSON.stringify({ habits })
			});
		});

		it("should throw an error if the fetch fails", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				statusText: "Internal Server Error"
			});

			await expect(postNewDay(fetch, [])).rejects.toThrow("Failed to create new day");
		});
	});

	describe("putDay", () => {
		it("should return updated day when the fetch is successful", async () => {
			const habits: Habit[] = [
				{ id: "1", isCompleted: true, name: "Drink water" },
				{ id: "2", isCompleted: false, name: "Read a book" }
			];
			const updatedDay = { id: "1", date: "2022-01-01", habits };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(updatedDay),
				status: 200
			});

			const result = await putDay(fetch, "1", habits);

			expect(result).toEqual(updatedDay);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith("/api/days/1", {
				method: "PUT",
				body: JSON.stringify({ habits })
			});
		});

		it("should throw an error if the fetch fails", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				statusText: "Internal Server Error"
			});

			await expect(putDay(fetch, "1", [])).rejects.toThrow("Failed to edit day");
		});
	});
});
