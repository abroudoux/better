import { relations } from "drizzle-orm";
import { integer, text, pgTable, boolean, json } from "drizzle-orm/pg-core";
import { link } from "fs";

export const usersTable = pgTable("users", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	name: text("name").notNull(),
	password: text("password").notNull(),
	isAdmin: boolean("is_admin").default(false)
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	habits: many(habitsTable),
	days: many(daysTable)
}));

export const habitsTable = pgTable("habits", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	name: text("name").notNull(),
	isCompleted: boolean("is_completed").default(false),
	userId: text("user_id")
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull()
});

export const habitsRelations = relations(habitsTable, ({ one }) => ({
	user: one(usersTable)
}));

export const daysTable = pgTable("days", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	date: text("date").notNull(),
	userId: text("user_id")
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	habits: json("habits").default([]),
	habitsCompleted: integer("habits_completed").default(0),
	habitsLen: integer("habits_len").default(0),
	percentage: integer("percentage").default(0)
});

export const daysRelations = relations(daysTable, ({ one }) => ({
	user: one(usersTable)
}));

export const trainingsTable = pgTable("trainings", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	userId: text("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	isArchived: boolean("is_archived").default(false),
	duration: integer("duration").default(0),
	link: text("link")
});

export const trainingsRelations = relations(trainingsTable, ({ one, many }) => ({
	user: one(usersTable),
	circuits: many(circuitsTable),
	exercises: many(exercisesTable)
}));

export const circuitsTable = pgTable("circuits", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	name: text("name").notNull(),
	reps: integer("reps").default(0),
	restExercice: integer("rest_exercice").default(0),
	restCircuit: integer("rest_circuit").default(0)
});

export const circuitsRelations = relations(circuitsTable, ({ many }) => ({
	exercises: many(exercisesTable)
}));

export const exercisesTable = pgTable("exercises", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	name: text("name").notNull(),
	reps: integer("reps").default(0).notNull(),
	sets: integer("sets").default(0),
	rest: integer("rest").default(0)
});

export const exercisesRelations = relations(exercisesTable, ({ one, many }) => ({
	circuit: one(circuitsTable),
	training: many(trainingsTable)
}));
