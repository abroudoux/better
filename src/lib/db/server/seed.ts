import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
	habitsTable,
	usersTable,
	trainingsTable,
	exercisesTable,
	circuitsTable
} from "$lib/db/server/schema";
import { trainingsDataTest } from "$utils/constants";

const connectionUrl = process.env.DATABASE_URL;

if (!connectionUrl) throw new Error("DATABASE_URL is not set");

const sql = postgres(connectionUrl);
const db = drizzle(sql);

async function seed() {
	try {
		const insertedUsers = await db
			.insert(usersTable)
			.values([
				{
					id: "2e3ae305-0bae-4fc0-9b8b-890770cbbaf0",
					name: "Arthur",
					password: "mysecretpassword",
					isAdmin: true
				}
			])
			.returning();
		console.log("Inserted users:", insertedUsers);

		const insertedHabits = await db
			.insert(habitsTable)
			.values([
				{
					id: "01d4ba3f-955b-422f-8f0a-4fb27bc74a14",
					name: "Drink Water",
					isCompleted: false,
					userId: "2e3ae305-0bae-4fc0-9b8b-890770cbbaf0"
				},
				{
					id: "655f1df3-1ea3-424e-b451-accc8e8d2018",
					name: "Exercise",
					isCompleted: false,
					userId: "2e3ae305-0bae-4fc0-9b8b-890770cbbaf0"
				}
			])
			.returning();
		console.log("Inserted habits:", insertedHabits);

		for (const training of trainingsDataTest) {
			const insertedTraining = await db
				.insert(trainingsTable)
				.values({
					id: training.id,
					userId: "2e3ae305-0bae-4fc0-9b8b-890770cbbaf0",
					name: training.name,
					isArchived: training.isArchived,
					duration: training.duration,
					link: training.link
				})
				.returning();
			console.log("Inserted training:", insertedTraining);

			if (training.circuits) {
				for (const circuit of training.circuits) {
					const insertedCircuit = await db
						.insert(circuitsTable)
						.values({
							id: circuit.id,
							name: circuit.name,
							reps: circuit.reps,
							restExercice: circuit.restExercice,
							restCircuit: circuit.restCircuit
						})
						.returning();
					console.log("Inserted circuit:", insertedCircuit);

					for (const exercise of circuit.exercises) {
						await db
							.insert(exercisesTable)
							.values({
								id: exercise.id,
								name: exercise.name,
								reps: exercise.reps,
								sets: 1,
								rest: 0
							})
							.returning();
					}
				}
			}

			for (const exercise of training.exercises) {
				await db
					.insert(exercisesTable)
					.values({
						id: exercise.id,
						name: exercise.name,
						reps: exercise.reps,
						sets: exercise.sets,
						rest: exercise.rest
					})
					.returning();
			}
		}

		console.log("Seeding completed successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		sql.end();
	}
}

seed();
