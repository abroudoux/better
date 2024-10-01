CREATE TABLE IF NOT EXISTS "days" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"date" text NOT NULL,
	"user_id" text NOT NULL,
	"habits" json DEFAULT '[]'::json,
	"habits_completed" integer DEFAULT 0,
	"percentage" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habits" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"name" text NOT NULL,
	"is_completed" boolean DEFAULT false,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"is_admin" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "days" ADD CONSTRAINT "days_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
