CREATE TABLE "budget" (
	"id" varchar PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"sources" json DEFAULT '[]'::json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_budget" (
	"id" varchar PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"name" varchar NOT NULL,
	"interest_rate" integer NOT NULL,
	"amount" integer NOT NULL
);
