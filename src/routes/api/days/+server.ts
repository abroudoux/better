import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import type { RequestEvent, RequestHandler } from "./$types";

import { db } from "$lib/db/server/client";
import { daysTable } from "$lib/db/server/schema";
import type { Day, Habit } from "$lib/utils/types/entities";
import { getDate } from "$lib/utils/days";

export const GET: RequestHandler = async () => {
	try {
		const now: string = getDate();
		const today = await db.query.daysTable.findFirst({
			where: eq(daysTable.date, now)
		});

		if (!today) return json({ isNewDay: true, message: "No record found." }, { status: 200 });

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
		const habits: Habit[] = (await request.json()).habits;
		habits.forEach((habit) => {
			habit.isCompleted = false;
		});
		const habitsLength: number = habits.length;
		const habitsCompleted: number = habits.filter((habit) => habit.isCompleted).length;
		const percentage: number = Math.round((habitsCompleted / habitsLength) * 100);
		const dayCreated: Day = {
			id: id,
			date: now,
			habits: habits,
			habitsCompleted: habitsCompleted,
			percentage: percentage,
			habitsNum: habits.length
		};

		await db.insert(daysTable).values(dayCreated).execute();

		return json({ day: dayCreated, message: "Day successfully created" }, { status: 201 });
	} catch (error: unknown) {
		console.error("Error creating day:", error instanceof Error ? error.message : error);
		return json(
			{ message: "Internal Server Error", error: error instanceof Error ? error.message : error },
			{ status: 500 }
		);
	}
};
