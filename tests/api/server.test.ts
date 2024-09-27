import { describe, it, expect, vi, beforeEach } from "vitest";

import { GET, POST } from "$api/habits/+server";
import type { Habit } from "$utils/types/entities";
import { db } from "$lib/db/client";

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock("$lib/db", () => ({
	db: {
		query: {
			habits: {
				findMany: vi.fn()
			}
		}
	}
}));

const mockEvent = {
	request: new Request("http://localhost:5173/api/habits", {
		method: "GET"
	})
};

describe("Habits API endpoints", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe.skip("GET /api/habits", () => {
		it("should return all habits", async () => {
			const habits: Habit[] = [
				{ id: "1", userId: "1", isCompleted: false, name: "Drink water", points: 10 },
				{ id: "2", userId: "1", isCompleted: false, name: "Read a book", points: 10 }
			];

			(db.query.habits.findMany as any).mockResolvedValueOnce(habits);

			const response = await GET(mockEvent as any);

			expect(response.status).toBe(200);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual(habits);

			expect(db.query.habits.findMany).toHaveBeenCalledTimes(1);
		});

		it("should return 500 on database error", async () => {
			(db.query.habits.findMany as any).mockRejectedValueOnce(new Error("DB error"));

			const response = await GET(mockEvent as any);

			expect(response.status).toBe(500);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({ message: "Internal Server Error" });
			expect(db.query.habits.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe.skip("POST /api/habits", () => {
		it("should create a new habit", async () => {
			const habit: Habit = {
				id: "1",
				userId: "1",
				isCompleted: false,
				name: "Drink water",
				points: 10
			};
			const newHabit = { name: "Drink water" };

			(db.insert as any).mockResolvedValueOnce({ values: vi.fn().mockResolvedValueOnce(habit) });

			const mockRequest = new Request("http://localhost:5173/api/habits", {
				method: "POST",
				body: JSON.stringify(newHabit),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const response = await POST({ request: mockRequest } as any);

			expect(response.status).toBe(201);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual(habit);

			expect(db.insert).toHaveBeenCalledTimes(1);
			expect(db.insert).toHaveBeenCalledWith("habits");
			expect(db.insert().values).toHaveBeenCalledTimes(1);
			expect(db.insert().values).toHaveBeenCalledWith(newHabit);
		});

		it("should return 500 on database error", async () => {
			(db.insert as any).mockRejectedValueOnce(new Error("DB error"));

			const mockRequest = new Request("http://localhost:5173/api/habits", {
				method: "POST",
				body: JSON.stringify({ name: "Drink water" }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const response = await POST({ request: mockRequest } as any);

			expect(response.status).toBe(500);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({ message: "Internal Server Error" });
			expect(db.insert).toHaveBeenCalledTimes(1);
			expect(db.insert).toHaveBeenCalledWith("habits");
		});
	});
});
