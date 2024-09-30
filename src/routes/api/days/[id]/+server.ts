import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { json } from "@sveltejs/kit";

import { db } from "$lib/db/server/client";
import { days } from "$lib/db/server/schema";

import type { Habit } from "$utils/types/entities";

export const GET: RequestHandler = async () => {
	try {
		const now: string = new Date().toISOString().slice(0, 10);
		const day = await db.query.days.findFirst({
			where: eq(days.date, now)
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

		const day = await db.query.days.findFirst({
			where: eq(days.id, params.id)
		});

		if (!day) return new Response(JSON.stringify({ error: "Day not found" }), { status: 404 });

		const { habits }: { habits: Habit[] } = await request.json();

		if (!habits || !Array.isArray(habits)) {
			return new Response(JSON.stringify({ error: "Habits not found or invalid" }), {
				status: 400
			});
		}

		const habitIds = habits.map((habit) => habit.id);

		const updatedDay = await db
			.update(days)
			.set({ habits: habitIds })
			.where(eq(days.id, params.id))
			.execute();

		return new Response(JSON.stringify(updatedDay), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error fetching habit:", error);
		return json({ message: "Iternal Server Error" }, { status: 500 });
	}
};
