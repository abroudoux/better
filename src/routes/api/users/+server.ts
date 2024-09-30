import { json } from "@sveltejs/kit";
import type { RequestHandler, RequestEvent } from "./$types";

import { db } from "$lib/db/server/client";

export const GET: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const user = await db.query.users.findFirst();

		if (!user) return json({ message: "User not found" }, { status: 404 });

		return new Response(JSON.stringify(user), {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (error: any) {
		console.error("Error fetching users:", error);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
