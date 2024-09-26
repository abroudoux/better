import type { RequestEvent } from "@sveltejs/kit";

import prisma from "$lib/db/prisma";
import type { User } from "$utils/types/entities";

export async function GET({ request }: RequestEvent) {
	try {
		const allHabits = await prisma.habit.findMany();

		if (!allHabits || allHabits.length === 0) {
			return new Response(JSON.stringify({ message: "No habits found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
		}

		return new Response(JSON.stringify(allHabits), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error: any) {
		console.error("Error fetching habits:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}

// export async function POST({ request }: RequestEvent) {
// 	const { name } = await request.json();

// 	if (!name) {
// 		return new Response(JSON.stringify({ message: "Missing name" }), {
// 			status: 400,
// 			headers: { "Content-Type": "application/json" }
// 		});
// 	}

// 	try {
// 		const user: User = {
// 			id: "1",
// 			name: "John Doe",
// 			email: "test@gmail.com",
// 			password: "password",
// 			isAdmin: false,
// 			createdAt: new Date().toString(),
// 			updatedAt: new Date().toString()
// 		};
// 		const habit = await prisma.habit.create({
// 			data: {
// 				name
// 			}
// 		});

// 		return new Response(JSON.stringify(habit), {
// 			status: 201,
// 			headers: { "Content-Type": "application/json" }
// 		});
// 	} catch (error: any) {
// 		console.error("Error creating habit:", error);
// 		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
// 			status: 500,
// 			headers: { "Content-Type": "application/json" }
// 		});
// 	}
// }

export async function DELETE({ request }: RequestEvent) {
	try {
		await prisma.habit.deleteMany();

		return new Response(JSON.stringify({ message: "All habits deleted" }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error: any) {
		console.error("Error deleting habits:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}