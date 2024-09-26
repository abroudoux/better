import { describe, it, expect, vi, beforeEach } from "vitest";

import { GET, POST } from "$api/habits/+server";
import type { Habit } from "$utils/types/entities";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Habits API endpoints", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("GET /api/habits", () => {
		it("should return all habits", async () => {
			const habits: Habit[] = [
				{ id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 },
				{ id: "2", userId: "1", isCompleted: false, name: "Read a book", points: 10 }
			];
			const mockResponse: Habit[] = { ...habits };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 200
			});

			const result = await GET();

			expect(result).toEqual({ habits });
			expect(mockFetch).toHaveBeenCalledWith("/api/habits");
			expect(result.status).toBe(200);
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("POST /api/habits", () => {
		it("should create a new habit", async () => {
			const newHabit: Habit = {
				id: "3",
				userId: "1",
				isCompleted: false,
				name: "Exercise",
				points: 10
			};
			const mockResponse: Habit = { ...newHabit };

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
				status: 201
			});

			const result = await POST({
				request: { json: () => Promise.resolve({ name: newHabit.name }) }
			});

			expect(result).toEqual({ newHabit });
			expect(mockFetch).toHaveBeenCalledWith("/api/habits");
			expect(result.status).toBe(201);
			expect(mockFetch).toHaveBeenCalledTimes(1);
		});
	});
});
