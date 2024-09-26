import type { RequestEvent } from "@sveltejs/kit";

import prisma from "$lib/db/prisma";

export async function GET({ params }: RequestEvent) {
	const userId = params.id;

	if (!userId) {
		return new Response(JSON.stringify({ message: "Missing userId" }), { status: 400 });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId }
		});

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error: any) {
		console.error("Error fetching user:", error);
		return new Response(JSON.stringify({ message: "Internal Error" }), { status: 500 });
	}
}

export async function PUT({ params, request }: RequestEvent) {
	const userId = params.id;
	const { name, email, password } = await request.json();

	if (!userId) {
		return new Response(JSON.stringify({ message: "Missing userId" }), { status: 400 });
	}

	try {
		const user = await prisma.user.update({
			where: { id: userId },
			data: {
				name,
				email,
				password
			}
		});

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error: any) {
		console.error("Error updating user:", error);
		return new Response(JSON.stringify({ message: "Internal Error" }), { status: 500 });
	}
}

export async function DELETE({ params }: RequestEvent) {
	const userId = params.id;

	if (!userId) {
		return new Response(JSON.stringify({ message: "Missing userId" }), { status: 400 });
	}

	try {
		await prisma.user.delete({
			where: { id: userId }
		});

		return new Response(JSON.stringify({ message: "User deleted" }), { status: 200 });
	} catch (error: any) {
		console.error("Error deleting user:", error);
		return new Response(JSON.stringify({ message: "Internal Error" }), { status: 500 });
	}
}
