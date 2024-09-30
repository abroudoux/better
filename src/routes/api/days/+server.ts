import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import type { RequestEvent, RequestHandler } from "./$types";

import { db } from "$lib/db/server/client";
import { days } from "$lib/db/server/schema";
import type { Day, Habit } from "$utils/types/entities";
import { getDate } from "$utils/days";

export const GET: RequestHandler = async () => {
	try {
		const now: string = getDate();
		const today = await db.query.days.findFirst({
			where: eq(days.date, now)
		});

		if (!today) {
			return new Response(JSON.stringify({ isNewDay: true, message: "No record found." }), {
				status: 200,
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		return new Response(JSON.stringify({ isNewDay: false, today }), {
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

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const now = getDate();
		const id = uuidv4().toString();
		const habits: string[] = (await request.json()).habits;
		const newDay: Day = {
			id,
			date: now,
			habits,
			numPoints: 0,
			numHabitCompleted: 0,
			numHabits: 0,
			percentage: 0
		};
		const dayCreated = await db.insert(days).values(newDay).execute();

		return new Response(JSON.stringify(dayCreated), {
			status: 201,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error creating day:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};
