import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const tableTest = pgTable("tableTest", {
	id: serial("id").primaryKey(),
	name: text("name").notNull()
});
