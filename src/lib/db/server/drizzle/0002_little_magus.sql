CREATE TABLE IF NOT EXISTS "circuits" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"name" text NOT NULL,
	"reps" integer DEFAULT 0,
	"rest_exercice" integer DEFAULT 0,
	"rest_circuit" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercises" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"name" text NOT NULL,
	"reps" integer DEFAULT 0 NOT NULL,
	"sets" integer DEFAULT 0,
	"rest" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainings" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"user_id" text,
	"name" text NOT NULL,
	"is_archived" boolean DEFAULT false,
	"duration" integer DEFAULT 0,
	"link" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainings" ADD CONSTRAINT "trainings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
