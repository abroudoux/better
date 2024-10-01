import { describe, it, expect, vi, beforeEach } from "vitest";

import { isNewDay, createNewDay } from "$services/days.services";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Day Services", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe.skip("isNewDay", () => {
		it("should return isNewDay and dayId", async () => {
			const isNewDay = true;
			const dayId = "1";
			const mockResponse = { isNewDay, today: { id: dayId } };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await isNewDay(fetch);

			expect(result).toEqual({ isNewDay, dayId });
			expect(mockFetch).toHaveBeenCalledWith("/api/days");
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("createNewDay", () => {
		it("should return new day", async () => {
			const habits = [
				{ id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 },
				{ id: "2", userId: "1", isCompleted: false, name: "Read a book", points: 10 }
			];
			const newDay = { id: "1", userId: "1", habits };

			const mockResponse = newDay;

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await createNewDay(fetch, habits);

			expect(result).toEqual(newDay);
			expect(mockFetch).toHaveBeenCalledWith("/api/days");
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});
});
