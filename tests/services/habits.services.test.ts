import { describe, it, expect, vi, beforeEach } from "vitest";

import {
	getAllHabits,
	getHabitById,
	postHabit,
	toggleHabitStatus,
	toggleAllHabitsStatus,
	deleteHabit
} from "$services/habits.services";
import type { Habit } from "$utils/types/entities";
import { is } from "drizzle-orm";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Habit services", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	const habits: Habit[] = [
		{ id: "1", isCompleted: false, name: "Drink water" },
		{ id: "2", isCompleted: true, name: "Exercise" }
	];
	const habit: Habit = habits[0];
	const newHabit: Habit = { id: "3", isCompleted: false, name: "Read a book" };

	describe("getAllHabits", () => {
		it("should return all habits when the fetch is successful", async () => {
			const mockResponse: Habit[] = habits;

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await getAllHabits(fetch);

			expect(result).toEqual(habits);
			expect(result).toHaveLength(2);
			expect(mockFetch).toHaveBeenCalledTimes(1);
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
		});

		it("should throw a generic error if an unexpected error occurs", async () => {
			mockFetch.mockRejectedValueOnce(new Error("Network error"));

			await expect(getAllHabits(fetch)).rejects.toThrow("Network error");
		});
	});

	describe("getHabitById", () => {
		const mockResponse: Habit = habit;

		it("should return habit by id", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await getHabitById(fetch, "1");

			expect(result).toEqual(habit);
			expect(mockFetch).toHaveBeenCalledWith("/api/habits/1", { method: "GET" });
		});

		it("should throw an error if response is not ok", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: "Not Found",
				json: () => Promise.resolve({})
			});

			await expect(getHabitById(fetch, "1")).rejects.toThrow("Failed to fetch habit");
			expect(mockFetch).toHaveBeenCalledWith("/api/habits/1", { method: "GET" });
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw a generic error if an unexpected error occurs", async () => {
			mockFetch.mockRejectedValueOnce(new Error("Network error"));

			await expect(getHabitById(fetch, "1")).rejects.toThrow("Network error");
		});
	});

	describe("postHabit", () => {
		it("should create a new habit", async () => {
			const mockResponse: Habit = newHabit;

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 201
			});

			const result: Habit = await postHabit(fetch, newHabit);

			expect(result).toEqual(newHabit);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith("/api/habits", {
				method: "POST",
				body: JSON.stringify({ name: newHabit.name })
			});
		});

		it("should throw an error if habit creation fails", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: "Server error" })
			});

			await expect(postHabit(fetch, newHabit)).rejects.toThrow("Failed to create habit");
			expect(mockFetch).toHaveBeenCalledWith("/api/habits", {
				method: "POST",
				body: JSON.stringify({ name: newHabit.name })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("toggleHabitStatus", () => {
		it("should toggle habit status", async () => {
			const newHabit: Habit = { ...habit, isCompleted: true };
			const mockResponse: Habit = newHabit;

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result: Habit = await toggleHabitStatus(fetch, habit.id);

			expect(result).toEqual(newHabit);
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "PUT",
				body: JSON.stringify({ habitId: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw an error if habit status toggle fails", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: "Server error" })
			});

			await expect(toggleHabitStatus(fetch, habit.id)).rejects.toThrow(
				"Failed to update habit status"
			);
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "PUT",
				body: JSON.stringify({ habitId: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw an error if habit is not found", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				json: () => Promise.resolve({ message: "Habit not found" })
			});

			await expect(toggleHabitStatus(fetch, habit.id)).rejects.toThrow(
				"Failed to update habit status"
			);
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "PUT",
				body: JSON.stringify({ habitId: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("toggleAllHabitsStatus", () => {
		it("should toggle all habits status to false", async () => {
			const newHabits: Habit[] = habits.map((habit) => ({ ...habit, isCompleted: false }));
			const mockResponse: Habit[] = newHabits;

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result: Habit[] = await toggleAllHabitsStatus(fetch, habits);

			expect(result).toEqual(newHabits);
			// expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("deleteHabit", () => {
		it("should delete a habit", async () => {
			const mockResponse: Habit = habit;

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result: Habit = await deleteHabit(fetch, habit.id);

			expect(result).toEqual(habit);
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "DELETE",
				body: JSON.stringify({ habitId: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw an error if habit deletion fails", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: "Server error" })
			});

			await expect(deleteHabit(fetch, habit.id)).rejects.toThrow("Failed to delete habit");
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "DELETE",
				body: JSON.stringify({ habitId: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});

		it("should throw an error if habit is not found", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				json: () => Promise.resolve({ message: "Habit not found" })
			});

			await expect(deleteHabit(fetch, habit.id)).rejects.toThrow("Failed to delete habit");
			expect(mockFetch).toHaveBeenCalledWith(`/api/habits/${habit.id}`, {
				method: "DELETE",
				body: JSON.stringify({ habitId: habit.id })
			});
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});
});
