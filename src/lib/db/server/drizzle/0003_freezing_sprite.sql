DROP TABLE "circuits";--> statement-breakpoint
DROP TABLE "exercises";--> statement-breakpoint
DROP TABLE "trainings";--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "days" DROP CONSTRAINT "days_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "habits" DROP CONSTRAINT "habits_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "days" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "habits" DROP COLUMN IF EXISTS "user_id";