import { relations } from "drizzle-orm";
import { integer, text, pgTable, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	isAdmin: boolean("is_admin").default(false)
});

export const habits = pgTable("habits", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	name: text("name").notNull(),
	isCompleted: boolean("is_completed").default(false),
	points: integer("points").notNull().default(10),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull()
});

export const days = pgTable("days", {
	id: text("id").primaryKey().default("uuid_generate_v4()"),
	date: text("date").notNull(),
	habits: text("habits").array().default([]),
	numPoints: integer("num_points").notNull().default(0),
	numHabits: integer("num_habits").notNull().default(0),
	numHabitCompleted: integer("num_habit_completed").notNull().default(0),
	percentage: integer("percentage").notNull().default(0)
});

export const usersRelations = relations(users, ({ many }) => ({
	habits: many(habits)
}));

export const habitsRelations = relations(habits, ({ one }) => ({
	user: one(users)
}));

export const daysRelations = relations(days, ({ many }) => ({
	habits: many(habits)
}));
