import { relations } from "drizzle-orm";
import { integer, pgTable, boolean, json, varchar } from "drizzle-orm/pg-core";

export const habitsTable = pgTable("habits", {
	id: varchar("id").primaryKey().default("uuid_generate_v4()"),
	name: varchar("name").notNull(),
	isCompleted: boolean("is_completed").default(false).notNull()
});

export const daysTable = pgTable("days", {
	id: varchar("id").primaryKey().default("uuid_generate_v4()"),
	date: varchar("date").notNull(),
	habits: json("habits").default([]).notNull(),
	habitsNum: integer("habits_num").default(0).notNull(),
	habitsCompleted: integer("habits_completed").default(0).notNull(),
	percentage: integer("percentage").default(0).notNull()
});

export const daysRelations = relations(daysTable, ({ one, many }) => ({
	habits: many(habitsTable)
}));

export const habitsRelations = relations(habitsTable, ({ many }) => ({
	days: many(daysTable)
}));
