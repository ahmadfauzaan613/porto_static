/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users_auth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_auth_username_key" ON "users_auth"("username");
