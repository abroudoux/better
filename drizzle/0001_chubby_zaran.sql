CREATE TABLE IF NOT EXISTS "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"is_completed" boolean DEFAULT false NOT NULL,
	"points" serial DEFAULT 10 NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "points" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"habit_id" serial NOT NULL,
	"points" serial NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	"profile_picture" text,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DROP TABLE "tableTest";