import { relations } from "drizzle-orm";
import { integer, text, pgTable, boolean, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	name: text("name").notNull(),
	password: text("password").notNull(),
	isAdmin: boolean("is_admin").default(false)
});

export const habitsTable = pgTable("habits", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	name: text("name").notNull(),
	isCompleted: boolean("is_completed").default(false),
	userId: text("user_id")
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull()
});

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

export const usersRelations = relations(usersTable, ({ many }) => ({
	habits: many(habitsTable),
	days: many(daysTable)
}));

export const habitsRelations = relations(habitsTable, ({ one }) => ({
	user: one(usersTable)
}));

export const daysRelations = relations(daysTable, ({ one }) => ({
	user: one(usersTable)
}));
