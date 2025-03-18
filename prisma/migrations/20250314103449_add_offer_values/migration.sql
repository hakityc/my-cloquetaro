/*
  Warnings:

  - You are about to drop the column `local_file_path` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `redirect_type` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `offers` table. All the data in the column will be lost.
  - The values [url] on the enum `offers_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `conversion_cap` on the `offers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to drop the `offer_values` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `offerValues` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Made the column `group_id` on table `offers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countries` on table `offers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `offer_values` DROP FOREIGN KEY `offer_values_offer_id_fkey`;

-- DropForeignKey
ALTER TABLE `offers` DROP FOREIGN KEY `offers_group_id_fkey`;

-- AlterTable
ALTER TABLE `offers` DROP COLUMN `local_file_path`,
    DROP COLUMN `redirect_type`,
    DROP COLUMN `url`,
    ADD COLUMN `offerValues` JSON NOT NULL,
    MODIFY `group_id` INTEGER NOT NULL,
    MODIFY `type` ENUM('local', 'redirect', 'preload', 'action') NOT NULL,
    MODIFY `countries` JSON NOT NULL,
    MODIFY `conversion_cap` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `offer_values`;

-- AddForeignKey
ALTER TABLE `offers` ADD CONSTRAINT `offers_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
