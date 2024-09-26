import { relations } from "drizzle-orm";
import { integer, text, pgTable, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	isAdmin: boolean("is_admin").default(false)
});

export const habits = pgTable("habits", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	isCompleted: boolean("is_completed").default(false),
	points: integer("points").notNull().default(10),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	habits: many(habits)
}));
