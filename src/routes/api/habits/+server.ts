import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import type { RequestEvent, RequestHandler } from "./$types";

import { db } from "$lib/db/server/client";
import { habitsTable } from "$lib/db/server/schema";

export const GET: RequestHandler = async () => {
	try {
		const habits = await db.query.habitsTable.findMany();

		if (!habits) return json([], { status: 404 });

		//! DEBUG
		console.log("habits from GET habits:", habits);

		return json(habits, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching habits:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const id = uuidv4();
		const { name } = await request.json();
		// TODO => replace userId with the actual user id
		const newHabit = {
			id,
			userId: "2e3ae305-0bae-4fc0-9b8b-890770cbbaf0",
			isCompleted: false,
			name
		};
		await db.insert(habitsTable).values(newHabit).execute();

		//! DEBUG
		console.log("newHabit from POST habits:", newHabit);

		return json({ newHabit: newHabit, message: "Habit successfully created" }, { status: 201 });
	} catch (error: any) {
		console.error("Error creating habit:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
