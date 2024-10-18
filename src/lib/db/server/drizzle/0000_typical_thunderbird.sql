CREATE TABLE IF NOT EXISTS "days" (
	"id" varchar PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"date" varchar NOT NULL,
	"habits" json DEFAULT '[]'::json NOT NULL,
	"habits_num" integer DEFAULT 0 NOT NULL,
	"habits_completed" integer DEFAULT 0 NOT NULL,
	"percentage" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habits" (
	"id" varchar PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"name" varchar NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL
);
