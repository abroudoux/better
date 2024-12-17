import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import type { RequestEvent, RequestHandler } from "./$types";

import { db } from "$lib/db/server/client";
import { sourceBudgetTable } from "$lib/db/server/schema";
import type { SourceBudget } from "$lib/utils/types/entities";

export const GET: RequestHandler = async () => {
	try {
		const sourcesBudget = await db.query.sourceBudgetTable.findMany();

		if (!sourcesBudget) return json([], { status: 404 });

		return json(sourcesBudget, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching sources budget:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const id: string = uuidv4();
		const { name, interestRate, amount } = await request.json();
		const newSourceBudget: SourceBudget = {
			id,
			name,
			interestRate,
			amount
		};
		await db.insert(sourceBudgetTable).values(newSourceBudget).execute();

		return json(
			{ newSourceBudget: newSourceBudget, message: "Source budget successfully created" },
			{ status: 201 }
		);
	} catch (error: any) {
		console.error("Error creating source budget:", error.message);
		return json({ message: "Internal Server Error" }, { status: 500 });
	}
};
