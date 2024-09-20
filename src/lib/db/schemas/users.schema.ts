import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: text("username").notNull(),
	password: text("password").notNull(),
	email: text("email").notNull().unique(),
	phone: text("phone").unique(),
	created_at: text("created_at").notNull(),
	updated_at: text("updated_at").notNull(),
	profile_picture: text("profile_picture")
});
