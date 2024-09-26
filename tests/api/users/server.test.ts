import { describe, it, expect, vi } from "vitest";

import { GET, POST } from "$api/users/+server";

vi.mock("$lib/db/prisma", () => ({
	default: {
		user: {
			findUnique: vi.fn().mockResolvedValue({ id: 1, name: "Test user" }),
			update: vi.fn().mockResolvedValue({ id: 1, name: "Test user" }),
			delete: vi.fn().mockResolvedValue(null)
		}
	}
}));

describe.skip("GET /users", () => {
	it("should return all users", async () => {
		const mockEvent = {
			params: {
				id: 1
			}
		} as any;
		const response = await GET(mockEvent);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ id: 1, name: "Test user" });
	});
});

describe("POST /users", () => {
	it("should create a new user", async () => {
		const user = {
			email: "test.test@gmail.com",
			password: "password",
			firstName: "Test",
			name: "User"
		};

		const mockEvent = {
			request: {
				json: vi.fn().mockResolvedValue(user)
			}
		} as any;
		const response = await POST(mockEvent);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(user);
	});
});
