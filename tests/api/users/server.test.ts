import { describe, it, expect, vi, beforeEach } from "vitest";

import { db } from "$lib/db/server/client";
import { GET } from "$api/users/+server";
import type { User } from "$utils/types/entities";

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock("$lib/db", () => ({
	db: {
		query: {
			users: {
				findFirst: vi.fn()
			}
		}
	}
}));

const mockEvent = {
	request: new Request("http://localhost:5173/api/users", {
		method: "GET"
	})
};

describe("Users API endpoints", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("GET /api/users", () => {
		it("should return user informations", async () => {
			const user: User = {
				id: "1",
				email: "test@gmail.com",
				password: "test",
				name: "test",
				isAdmin: false
			};

			(db.query.users.findFirst as any).mockResolvedValueOnce(user);

			const response = await GET(mockEvent as any);

			expect(response.status).toBe(200);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual(user);
			expect(db.query.users.findFirst).toHaveBeenCalledTimes(1);
		});

		it("should return 404 if user not found", async () => {
			(db.query.users.findFirst as any).mockResolvedValueOnce(null);

			const response = await GET(mockEvent as any);

			expect(response.status).toBe(404);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({ message: "User not found" });
			expect(db.query.users.findFirst).toHaveBeenCalledTimes(1);
		});

		it("should return 500 on database error", async () => {
			(db.query.users.findFirst as any).mockRejectedValueOnce(new Error("DB error"));

			const response = await GET(mockEvent as any);

			expect(response.status).toBe(500);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({ message: "Internal Server Error" });
			expect(db.query.users.findFirst).toHaveBeenCalledTimes(1);
		});
	});
});
