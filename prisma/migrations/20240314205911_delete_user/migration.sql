/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project_users" DROP CONSTRAINT "project_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "task_comments" DROP CONSTRAINT "task_comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "task_users" DROP CONSTRAINT "task_users_user_id_fkey";

-- DropTable
DROP TABLE "users";
