CREATE TABLE IF NOT EXISTS "days" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"date" text NOT NULL,
	"habits" text[] DEFAULT '{}',
	"num_points" integer DEFAULT 0 NOT NULL,
	"num_habits" integer DEFAULT 0 NOT NULL,
	"num_habit_completed" integer DEFAULT 0 NOT NULL,
	"percentage" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "id" SET DEFAULT 'uuid_generate_v4()';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT 'uuid_generate_v4()';