import type { RequestEvent } from "@sveltejs/kit";

import prisma from "$lib/db/prisma";

export async function GET({ params }: RequestEvent) {
	const habitId = params.id;

	if (!habitId) {
		return new Response(JSON.stringify({ message: "Missing habitId" }), { status: 400 });
	}

	try {
		const habit = await prisma.habit.findUnique({
			where: { id: habitId }
		});

		if (!habit) {
			return new Response(JSON.stringify({ message: "Habit not found" }), { status: 404 });
		}

		return new Response(JSON.stringify(habit), { status: 200 });
	} catch (error: any) {
		console.error("Error fetching habit:", error);
		return new Response(JSON.stringify({ message: "Internal Error" }), { status: 500 });
	}
}

export async function PUT({ params, request }: RequestEvent) {
	const habitId = params.id;
	const { name } = await request.json();

	if (!habitId) {
		return new Response(JSON.stringify({ message: "Missing habitId" }), { status: 400 });
	}

	try {
		const habit = await prisma.habit.update({
			where: { id: habitId },
			data: {
				name
			}
		});

		if (!habit) {
			return new Response(JSON.stringify({ message: "Habit not found" }), { status: 404 });
		}

		return new Response(JSON.stringify(habit), { status: 200 });
	} catch (error: any) {
		console.error("Error updating habit:", error);
		return new Response(JSON.stringify({ message: "Internal Error" }), { status: 500 });
	}
}

export async function DELETE({ params }: RequestEvent) {
	const habitId = params.id;

	if (!habitId) {
		return new Response(JSON.stringify({ message: "Missing habitId" }), { status: 400 });
	}

	try {
		const deletedHabit = await prisma.habit.delete({
			where: { id: habitId }
		});

		if (!deletedHabit) {
			return new Response(JSON.stringify({ message: "Habit not found" }), { status: 404 });
		}

		return new Response(JSON.stringify(deletedHabit), { status: 200 });
	} catch (error: any) {
		console.error("Error deleting habit:", error);
		return new Response(JSON.stringify({ message: "Internal Error" }), { status: 500 });
	}
}
