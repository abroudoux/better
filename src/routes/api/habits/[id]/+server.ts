import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { RequestEvent, RequestHandler } from "./$types";

import { db } from "$lib/db/client";
import { habits } from "$lib/db/schema";

export const GET: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		const habit = await db.query.habits.findFirst({
			where: eq(habits.id, params.id)
		});

		if (!habit) return new Response(JSON.stringify({ error: "Habit not found" }), { status: 404 });

		return new Response(JSON.stringify(habit), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error fetching habit:", error);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		const id = params.id;
		const habit = await db.query.habits.findFirst({
			where: eq(habits.id, id)
		});

		if (!habit) return new Response(JSON.stringify({ error: "Habit not found" }), { status: 404 });

		const newStatus = !habit.isCompleted;
		await db.update(habits).set({ isCompleted: newStatus }).where(eq(habits.id, id));

		return new Response(JSON.stringify(habit), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error updating habit:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};

export const DELETE: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		const id = params.id;
		const habit = await db.query.habits.findFirst({
			where: eq(habits.id, id)
		});

		if (!habit) return new Response(JSON.stringify({ error: "Habit not found" }), { status: 404 });

		await db.delete(habits).where(eq(habits.id, id));

		return new Response(JSON.stringify(habit), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error deleting habit:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};
