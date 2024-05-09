/*
  Warnings:

  - Added the required column `desc` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `desc` VARCHAR(191) NOT NULL;
