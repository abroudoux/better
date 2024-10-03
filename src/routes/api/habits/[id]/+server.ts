import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { RequestEvent, RequestHandler } from "./$types";

import { db } from "$lib/db/server/client";
import { habitsTable } from "$lib/db/server/schema";

export const GET: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		const habit = await db.query.habitsTable.findFirst({
			where: eq(habitsTable.id, params.id)
		});

		if (!habit) return json({ habit: {}, message: "No habit found" }, { status: 404 });

		//! DEBUG
		console.log("habit from GET habit:", habit);

		return json(habit, { status: 200 });
	} catch (error: any) {
		console.error(`Error fetching habit with id ${params.id}:`, error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		const id = params.id;
		const habit = await db.query.habitsTable.findFirst({
			where: eq(habitsTable.id, id)
		});

		if (!habit) return json({ habit: {}, message: "Habit not found" }, { status: 404 });

		const newStatus = !habit.isCompleted;
		await db.update(habitsTable).set({ isCompleted: newStatus }).where(eq(habitsTable.id, id));

		//! DEBUG
		console.log("habit from PUT habit:", habit);

		return json({ habit: habit, message: "Habit successfully updated" }, { status: 200 });
	} catch (error: any) {
		console.error("Error updating habit:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		const id = params.id;
		const habit = await db.query.habitsTable.findFirst({
			where: eq(habitsTable.id, id)
		});

		if (!habit) return json({ habit: {}, message: "Habit not found" }, { status: 404 });

		await db.delete(habitsTable).where(eq(habitsTable.id, id));

		//! DEBUG
		console.log("habit from DELETE habit:", habit);

		return json({ habit: habit, message: "Habit successfully deleted" }, { status: 200 });
	} catch (error: any) {
		console.error("Error deleting habit:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
