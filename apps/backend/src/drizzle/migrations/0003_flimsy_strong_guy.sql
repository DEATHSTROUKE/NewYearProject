ALTER TABLE "user_reviews" DROP CONSTRAINT "user_reviews_review_id_reviews_id_fk";
ALTER TABLE "user_reviews" DROP COLUMN IF EXISTS "review_id";
ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "reviews" CASCADE;--> statement-breakpoint
--> statement-breakpoint