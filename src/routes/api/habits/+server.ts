import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import type { RequestEvent, RequestHandler } from "./$types";

import { db } from "$lib/db/server/client";
import { habitsTable } from "$lib/db/server/schema";
import type { Habit } from "$lib/utils/types/entities";

export const GET: RequestHandler = async () => {
	try {
		const habits = await db.query.habitsTable.findMany();

		if (!habits) return json([], { status: 404 });

		return json(habits, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching habits:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const id: string = uuidv4();
		const { name } = await request.json();
		const newHabit: Habit = {
			id,
			isCompleted: false,
			name
		};
		await db.insert(habitsTable).values(newHabit).execute();

		return json({ newHabit: newHabit, message: "Habit successfully created" }, { status: 201 });
	} catch (error: any) {
		console.error("Error creating habit:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
