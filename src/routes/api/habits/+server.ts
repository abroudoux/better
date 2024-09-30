import { json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { v4 as uuidv4 } from "uuid";

import { db } from "$lib/db/server/client";
import { habits } from "$lib/db/server/schema";

export const GET: RequestHandler = async () => {
	try {
		const habits = await db.query.habits.findMany();

		return new Response(JSON.stringify(habits), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error fetching habits:", error);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
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

		return new Response(JSON.stringify(newHabit), {
			status: 201,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error creating habit:", error);
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};
