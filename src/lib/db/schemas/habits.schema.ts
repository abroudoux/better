import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const habits = pgTable("habits", {
	id: serial("id").primaryKey(),
	user_id: serial("user_id").notNull(),
	title: text("title").notNull(),
	description: text("description"),
	is_completed: boolean("is_completed").notNull().default(false),
	points: serial("points").notNull().default(10),
	created_at: text("created_at").notNull(),
	updated_at: text("updated_at").notNull()
});
