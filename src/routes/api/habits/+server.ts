import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { v4 as uuidv4 } from "uuid";

import { db } from "$lib/db/client";
import { habits } from "$lib/db/schema";

export const GET: RequestHandler = async () => {
	try {
		const habits = await db.query.habits.findMany();
		return json({ habits }, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching habits:", error);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name } = await request.json();
		const id = uuidv4().toString();
		const newHabit = {
			id,
			userId: "1",
			isCompleted: false,
			name
		};
		const habit = await db.insert(habits).values(newHabit).execute();

		return json({ newHabit }, { status: 201 });
	} catch (error: any) {
		console.error("Error creating habit:", error);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
