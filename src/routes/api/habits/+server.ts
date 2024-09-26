import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { eq } from "drizzle-orm";

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
