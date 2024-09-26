import { json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { eq } from "drizzle-orm";

import { db } from "$lib/db/client";
import { habits } from "$lib/db/schema";

export async function GET({ params, request }: RequestEvent) {
	try {
		const habit = await db.query.habits.findFirst({
			where: eq(habits.id, params.id)
		});
		return json({ habit }, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching habit:", error);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { id } = await request.json();
		const habit = await db.query.habits.findFirst({
			where: eq(habits.id, id)
		});

		if (!habit) return json({ error: "Habit not found" }, { status: 404 });

		const newStatus = !habit.isCompleted;
		await db.update(habits).set({ isCompleted: newStatus }).where(eq(habits.id, id));

		return json({ success: true, habit }, { status: 200 });
	} catch (error: any) {
		console.error("Error updating habit:", error);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
