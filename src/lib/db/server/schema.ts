import { sql, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const habitsTable = sqliteTable("habits", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	isCompleted: integer({ mode: "boolean" }).default(false).notNull()
});

export const daysTable = sqliteTable("days", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	date: text()
		.default(sql`(CURRENT_DATE)`)
		.notNull(),
	habits: text({ mode: "json" }).notNull(),
	habitsNum: integer().default(0).notNull(),
	habitsCompleted: integer().default(0).notNull(),
	percentage: integer().default(0).notNull()
});

export const daysRelations = relations(daysTable, ({ many }) => ({
	habits: many(habitsTable)
}));

export const habitsRelations = relations(habitsTable, ({ many }) => ({
	days: many(daysTable)
}));
