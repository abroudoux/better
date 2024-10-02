import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

import { db } from "$lib/db/server/client";
import { daysTable } from "$lib/db/server/schema";

import type { Habit } from "$utils/types/entities";

export const GET: RequestHandler = async () => {
	try {
		const now: string = new Date().toISOString().slice(0, 10);
		const day = await db.query.daysTable.findFirst({
			where: eq(daysTable.date, now)
		});

		if (!day) {
			return new Response(JSON.stringify({ message: "No record found." }), {
				status: 404,
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		return new Response(JSON.stringify({ day }), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error fetching day:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};

export const PUT: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		if (!params.id)
			return new Response(JSON.stringify({ error: "Day ID is missing" }), { status: 400 });

		const day = await db.query.daysTable.findFirst({
			where: eq(daysTable.id, params.id)
		});

		if (!day) return new Response(JSON.stringify({ error: "Day not found" }), { status: 404 });

		const { habits }: { habits: Habit[] } = await request.json();

		if (!habits || !Array.isArray(habits)) {
			return new Response(JSON.stringify({ error: "Habits not found or invalid" }), {
				status: 400
			});
		}

		const habitsLength: number = habits.length;
		const habitsCompleted: number = habits.filter((habit) => habit.isCompleted).length;
		const percentage: number = Math.round((habitsCompleted / habitsLength) * 100);
		const habitsJson = JSON.stringify(habits);

		await db
			.update(daysTable)
			.set({ habits: habitsJson, habitsCompleted, habitsLen: habitsLength, percentage })
			.where(eq(daysTable.id, params.id))
			.execute();

		const updatedDay = await db.query.daysTable.findFirst({
			where: eq(daysTable.id, params.id)
		});

		if (!updatedDay)
			return new Response(JSON.stringify({ error: "Day not found" }), { status: 404 });

		return new Response(JSON.stringify(updatedDay), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error updating day:", error);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
