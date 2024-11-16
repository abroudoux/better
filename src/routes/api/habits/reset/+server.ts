import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

import { db } from "$lib/db/server/client";
import { habitsTable } from "$lib/db/server/schema";

export const POST: RequestHandler = async () => {
	try {
		const habits = await db.query.habitsTable.findMany({});

		if (!habits) return json({ habits: [], message: "No habits found" }, { status: 404 });

		console.log("HEEEEEEEEEEEEERE", habits);

		for (const habit of habits) {
			await db
				.update(habitsTable)
				.set({ isCompleted: false })
				.where(eq(habitsTable.id, habit.id))
				.execute();
		}

		const newHabits = await db.query.habitsTable.findMany({});

		console.log("habits from reset:", newHabits);

		return json({ habits, message: "Habits successfully reset" }, { status: 200 });
	} catch (error: any) {
		console.error("Error resetting habits:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
