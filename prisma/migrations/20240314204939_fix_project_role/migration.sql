/*
  Warnings:

  - You are about to drop the column `role_id` on the `project_users` table. All the data in the column will be lost.
  - You are about to drop the `project_roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `project_users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectRoleEnum" AS ENUM ('ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "project_users" DROP CONSTRAINT "project_users_role_id_fkey";

-- AlterTable
ALTER TABLE "project_users" DROP COLUMN "role_id",
ADD COLUMN     "role" "ProjectRoleEnum" NOT NULL;

-- DropTable
DROP TABLE "project_roles";
