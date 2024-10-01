import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import type { RequestEvent, RequestHandler } from "./$types";

import { db } from "$lib/db/server/client";
import { daysTable } from "$lib/db/server/schema";
import type { Day, Habit } from "$utils/types/entities";
import { getDate } from "$utils/days";

export const GET: RequestHandler = async () => {
	try {
		const now: string = getDate();
		const today = await db.query.daysTable.findFirst({
			where: eq(daysTable.date, now)
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
		const userId = "2e3ae305-0bae-4fc0-9b8b-890770cbbaf0";
		const habits: Habit[] = (await request.json()).habits;
		const habitsLength: number = habits.length;
		const habitsCompleted: number = habits.filter((habit) => habit.isCompleted).length;
		const percentage: number = (habitsCompleted / habitsLength) * 100;

		const newDay: Day = {
			id,
			userId,
			date: now,
			habits: habits,
			habitsCompleted: habitsCompleted,
			percentage: percentage
		};

		const dayCreated = await db.insert(daysTable).values(newDay).execute();

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
