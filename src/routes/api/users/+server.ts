import type { RequestEvent } from "@sveltejs/kit";

import prisma from "$lib/db/prisma";

export async function GET({ request }: RequestEvent) {
	try {
		const allUsers = await prisma.user.findMany();

		if (!allUsers || allUsers.length === 0) {
			return new Response(JSON.stringify({ message: "No users found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
		}

		return new Response(JSON.stringify(allUsers), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error: any) {
		console.error("Error fetching users:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}

export async function POST({ request }: RequestEvent) {
	const { email, password, name } = await request.json();

	switch (true) {
		case !email:
			return new Response(JSON.stringify({ message: "Missing email" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		case !password:
			return new Response(JSON.stringify({ message: "Missing password" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		case !name:
			return new Response(JSON.stringify({ message: "Missing name" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
	}

	try {
		const user = await prisma.user.create({
			data: {
				email,
				password,
				name
			}
		});

		return new Response(JSON.stringify(user), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error: any) {
		console.error("Error creating user:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}

export async function DELETE({ request }: RequestEvent) {
	try {
		await prisma.user.deleteMany();

		return new Response(JSON.stringify({ message: "All users deleted" }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error: any) {
		console.error("Error deleting users:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}
