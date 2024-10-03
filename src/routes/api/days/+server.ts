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

		if (!today) return json({ isNewDay: true, message: "No record found." }, { status: 200 });

		//! DEBUG
		console.log("today from GET days:", today);

		return json({ isNewDay: false, day: today }, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching day:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const now = getDate();
		const id = uuidv4().toString();
		// TODO => replace userId with the actual user id
		const userId = "2e3ae305-0bae-4fc0-9b8b-890770cbbaf0";
		const habits: Habit[] = (await request.json()).habits;
		const habitsLength: number = habits.length;
		const habitsCompleted: number = habits.filter((habit) => habit.isCompleted).length;
		const percentage: number = (habitsCompleted / habitsLength) * 100;
		const newDay: Day = {
			id: id,
			userId: userId,
			date: now,
			habits: habits,
			habitsCompleted: habitsCompleted,
			percentage: percentage
		};

		const dayCreated = await db.insert(daysTable).values(newDay).execute();

		//! DEBUG
		console.log("dayCreated from POST days:", dayCreated);

		return json({ day: dayCreated, message: "Day successfully created" }, { status: 201 });
	} catch (error: any) {
		console.error("Error creating day:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
