import { describe, it, expect, vi, beforeEach } from "vitest";

import {
	getAllHabits,
	getHabitById,
	postHabit,
	toggleHabitStatus,
	deleteHabit
} from "$services/habit.services";

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
			const mockResponse = { habits };

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

	describe("getHabitById", () => {
		it("should return habit by id", async () => {
			const habit = { id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 };
			const mockResponse = { habit };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await getHabitById(fetch, "1");

			expect(result).toEqual({ habit });
			expect(mockFetch).toHaveBeenCalledWith("/api/habits/1");
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("postHabit", () => {
		it("should create a new habit", async () => {
			const newHabit = {
				name: "Exercise"
			};
			const mockResponse = { newHabit };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 201
			});

			const result = await postHabit(fetch, newHabit);

			expect(result).toEqual({ newHabit });
			expect(mockFetch).toHaveBeenCalledWith("/api/habits", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ name: newHabit.name })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("toggleHabitStatus", () => {
		it("should toggle habit status", async () => {
			const habit = { id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 };
			const newHabit = { ...habit, isCompleted: true };
			const mockResponse = { newHabit };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await toggleHabitStatus(fetch, habit.id);

			expect(result).toEqual({ newHabit });
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("deleteHabit", () => {
		it("should delete a habit", async () => {
			const habit = { id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 };
			const mockResponse = { habit };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await deleteHabit(fetch, habit.id);

			expect(result).toEqual({ habit });
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});
});
