import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

import { db } from "$lib/db/server/client";
import { habitsTable } from "$lib/db/server/schema";
import type { Habit } from "$lib/utils/types/entities";

export const POST: RequestHandler = async () => {
	try {
		const habits = (await db.query.habitsTable.findMany({})) as Habit[];

		if (!habits) return json({ habits: [], message: "No habits found" }, { status: 404 });

		for (const habit of habits) {
			await db
				.update(habitsTable)
				.set({ isCompleted: false })
				.where(eq(habitsTable.id, habit.id))
				.execute();
		}

		return json({ habits, message: "Habits successfully reset" }, { status: 200 });
	} catch (error: any) {
		console.error("Error resetting habits:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
