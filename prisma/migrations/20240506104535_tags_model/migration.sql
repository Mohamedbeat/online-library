/*
  Warnings:

  - You are about to alter the column `bio` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `bio` VARCHAR(191) NOT NULL;
