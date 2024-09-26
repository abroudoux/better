import { describe, it, vi, beforeEach, expect } from "vitest";

import {
	getHabit,
	getAllHabits,
	postHabit,
	deleteHabit,
	deleteAllHabits
} from "$services/habit.services";
import type { Habit } from "$utils/types/entities";
import type { HabitRequest } from "$utils/types/services";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Habit Services", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("getHabit", () => {
		it("should return a habit", () => {
			const habitId = "1";
			const mockHabit: Habit = {
				id: "1",
				name: "Exercise",
				isCompleted: false,
				points: 10
			};
			const mockResponse: Habit = { ...mockHabit };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse
			});

			const result = getHabit(habitId);

			expect(result).toEqual(mockResponse);
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habitId}`);
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("getAllHabits", () => {
		it("should return all habits", () => {
			const mockHabits: Habit[] = [
				{
					id: "1",
					name: "Exercise",
					isCompleted: false,
					points: 10
				},
				{
					id: "2",
					name: "Read",
					isCompleted: false,
					points: 5
				}
			];
			const mockResponse: Habit[] = [...mockHabits];

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse
			});

			const result = getAllHabits();

			expect(result).toEqual(mockResponse);
			expect(mockFetch).toHaveBeenCalledWith("/api/habits");
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("postHabit", () => {
		it("should create a habit", () => {
			const habit: HabitRequest = {
				name: "Exercise"
			};
			const mockHabit: Habit = {
				id: "1",
				name: habit.name,
				isCompleted: false,
				points: 10
			};
			const mockResponse: Habit = { ...mockHabit };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse
			});

			const result = postHabit(habit);

			expect(result).toEqual(mockResponse);
			expect(mockFetch).toHaveBeenCalledWith("/api/habits", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(mockHabit)
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("deleteHabit", () => {
		it("should delete a habit", () => {
			const habitId = "1";

			deleteHabit(habitId);

			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habitId}`, {
				method: "DELETE"
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("deleteAllHabits", () => {
		it("should delete all habits", () => {
			deleteAllHabits();

			expect(mockFetch).toHaveBeenCalledWith("/api/habits", {
				method: "DELETE"
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});
});
