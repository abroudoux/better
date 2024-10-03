import { describe, it, expect, vi, beforeEach } from "vitest";

import { isNewDay, postNewDay, putDay } from "$services/days.services";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Day Services", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe.skip("isNewDay", () => {
		it("should return isNewDay response when the fetch is successful", async () => {
			const response = {
				isNewDay: true,
				today: { id: "1", date: "2022-01-01", habits: [] }
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(response),
				status: 200
			});

			const result = await isNewDay(fetch);

			expect(result).toEqual(response);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith("/api/days");
		});
	});

	describe("postNewDay", () => {
		it("should return new day when the fetch is successful", async () => {
			const habits = [
				{ id: "1", userId: "1", isCompleted: false, name: "Drink water" },
				{ id: "2", userId: "1", isCompleted: false, name: "Read a book" }
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
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ habits })
			});
		});
	});
});
