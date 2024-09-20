import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const points = pgTable("points", {
	id: serial("id").primaryKey(),
	user_id: serial("user_id").notNull(),
	habit_id: serial("habit_id").notNull(),
	points: serial("points").notNull(),
	created_at: text("created_at").notNull(),
	updated_at: text("updated_at").notNull()
});
