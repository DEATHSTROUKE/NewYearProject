ALTER TABLE "admin_texts" ALTER COLUMN "title" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "lottery_number" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_lottery_user" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "admin_texts" ADD CONSTRAINT "admin_texts_title_unique" UNIQUE("title");