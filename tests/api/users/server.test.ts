import { describe, it, expect, vi, beforeEach } from "vitest";

import { db } from "$lib/db/server/client";
import { GET } from "$api/users/+server";
import type { User } from "$utils/types/entities";
import { mock } from "node:test";

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
			const mockUser: User = {
				id: "1",
				name: "John Doe",
				email: "john.doe@gmail.com",
				password: "password",
				isAdmin: false
			};
			const mockResponse = new Response(JSON.stringify(mockUser), {
				status: 200,
				headers: {
					"Content-Type": "application/json"
				}
			});

			mockFetch.mockResolvedValue({
				ok: true,
				json: Promise.resolve(mockUser),
				status: 200
			});

			const response = await GET(mockEvent);

			expect(response).toEqual(mockResponse);
			expect(db.query.users.findFirst).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledWith("/api/users");
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(response.status).toBe(200);
		});
	});
});
