import { describe, it, expect, vi, beforeEach } from "vitest";

import {
	getAllHabits,
	getHabitById,
	postHabit,
	toggleHabitStatus,
	deleteHabit
} from "$services/habits.services";
import type { Habit } from "$utils/types/entities";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Habit services", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("getAllHabits", () => {
		it("should return all habits when the fetch is successful", async () => {
			const habits: Habit[] = [
				{ id: "1", userId: "1", isCompleted: false, name: "Drink water" },
				{ id: "2", userId: "1", isCompleted: false, name: "Read a book" }
			];
			const mockResponse = habits;

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await getAllHabits(fetch);

			expect(result).toEqual(habits);
			expect(result).toHaveLength(2);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith("/api/habits");
		});

		it("should return an empty array when no habits are found", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve([]),
				status: 200
			});

			const result = await getAllHabits(fetch);

			expect(result).toEqual([]);
			expect(result).toHaveLength(0);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith("/api/habits");
		});
	});

	describe("getHabitById", () => {
		const habit = { id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 };
		const mockResponse = habit;

		it("should return habit by id", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await getHabitById(fetch, "1");

			expect(result).toEqual(habit);
			expect(mockFetch).toHaveBeenCalledWith("/api/habits/1");
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw an error if habit is not found", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				json: () => Promise.resolve({ message: "Habit not found" })
			});

			await expect(getHabitById(fetch, "1")).rejects.toThrow("Error during getHabitById service");
			expect(mockFetch).toHaveBeenCalledWith("/api/habits/1");
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw an error if fetch fails", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: "Server error" })
			});

			await expect(getHabitById(fetch, "1")).rejects.toThrow("Error during getHabitById service");
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

		it("should throw an error if habit creation fails", async () => {
			const newHabit = {
				name: "Exercise"
			};

			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: "Server error" })
			});

			await expect(postHabit(fetch, newHabit)).rejects.toThrow("Failed during postHabit service");
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

		it("should throw an error if habit status toggle fails", async () => {
			const habit = { id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 };

			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: "Server error" })
			});

			await expect(toggleHabitStatus(fetch, habit.id)).rejects.toThrow(
				"Failed during toggleHabitStatus service"
			);
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw an error if habit is not found", async () => {
			const habit = { id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 };

			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				json: () => Promise.resolve({ message: "Habit not found" })
			});

			await expect(toggleHabitStatus(fetch, habit.id)).rejects.toThrow(
				"Failed during toggleHabitStatus service"
			);
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

		it("should throw an error if habit deletion fails", async () => {
			const habit = { id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 };

			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: "Server error" })
			});

			await expect(deleteHabit(fetch, habit.id)).rejects.toThrow(
				"Failed during deleteHabit service"
			);
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw an error if habit is not found", async () => {
			const habit = { id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 };

			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				json: () => Promise.resolve({ message: "Habit not found" })
			});

			await expect(deleteHabit(fetch, habit.id)).rejects.toThrow(
				"Failed during deleteHabit service"
			);
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
