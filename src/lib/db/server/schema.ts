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

export const budgetTable = pgTable("budget", {
	id: varchar("id").primaryKey().default("uuid_generate_v4()"),
	sources: json("sources").default([]).notNull()
});

export const sourceBudgetTable = pgTable("source_budget", {
	id: varchar("id").primaryKey().default("uuid_generate_v4()"),
	name: varchar("name").notNull(),
	interestRate: integer("interest_rate").notNull(),
	amount: integer("amount").notNull()
});

export const daysRelations = relations(daysTable, ({ many }) => ({
	habits: many(habitsTable)
}));

export const habitsRelations = relations(habitsTable, ({ many }) => ({
	days: many(daysTable)
}));

export const budgetRelations = relations(budgetTable, ({ many }) => ({
	sources: many(sourceBudgetTable)
}));
