CREATE TABLE `days` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text DEFAULT (CURRENT_DATE) NOT NULL,
	`habits` text NOT NULL,
	`habitsNum` integer DEFAULT 0 NOT NULL,
	`habitsCompleted` integer DEFAULT 0 NOT NULL,
	`percentage` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`isCompleted` integer DEFAULT false NOT NULL
);
