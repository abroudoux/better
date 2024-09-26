import { describe, it, expect, vi, beforeEach } from "vitest";

import { getAllHabits, postHabit } from "$services/habit.services";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Habit services", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("getAllHabits", () => {
		it("should return all habits", async () => {
			const habits = [
				{ id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 },
				{ id: "2", userId: "1", isCompleted: false, name: "Read a book", points: 10 }
			];
			const mockResponse = { ...habits };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await getAllHabits(fetch);

			expect(result).toEqual({ habits });
			expect(mockFetch).toHaveBeenCalledWith("/api/habits");
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("postHabit", () => {
		it("should create a new habit", async () => {
			const newHabit = {
				id: "3",
				userId: "1",
				isCompleted: false,
				name: "Exercise",
				points: 10
			};
			const mockResponse = { ...newHabit };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 201
			});

			const result = await postHabit(fetch, newHabit.name);

			expect(result).toEqual({ newHabit });
			expect(mockFetch).toHaveBeenCalledWith("/api/habits");
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});
});
