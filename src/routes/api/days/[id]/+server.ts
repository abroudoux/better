import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

import { db } from "$lib/db/server/client";
import { daysTable } from "$lib/db/server/schema";
import type { Habit, Day } from "$lib/utils/types/entities";

export const GET: RequestHandler = async () => {
	try {
		const today: string = new Date().toISOString().slice(0, 10);
		const day = await db.query.daysTable.findFirst({
			where: eq(daysTable.date, today)
		});

		if (!day) return json({ habit: {}, message: "No habit found" }, { status: 404 });

		return json(day, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching today's habit:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		if (!params.id) return json({ params: "", message: "No id provided" }, { status: 400 });

		const day = await db.query.daysTable.findFirst({
			where: eq(daysTable.id, params.id)
		});

		if (!day) return json({ day: {}, message: "Day not found" }, { status: 404 });

		const { habits }: { habits: Habit[] } = await request.json();

		if (!habits || !Array.isArray(habits)) {
			return json({ habits: [], message: "No habits provided" }, { status: 400 });
		}

		const habitsNum: number = habits.length;
		const habitsCompleted: number = habits.filter((habit) => habit.isCompleted).length;
		const percentage: number = Math.round((habitsCompleted / habitsNum) * 100);
		const habitsJson = habits;
		const updatedDay: Day = {
			date: day.date,
			id: params.id,
			habits: habitsJson,
			habitsNum,
			habitsCompleted,
			percentage
		};

		await db.update(daysTable).set(updatedDay).where(eq(daysTable.id, params.id)).execute();

		return json({ updatedDay: updatedDay, message: "Day successfully updated" }, { status: 200 });
	} catch (error: any) {
		console.error("Error updating day:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
