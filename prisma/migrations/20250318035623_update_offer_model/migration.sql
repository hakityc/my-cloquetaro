/*
  Warnings:

  - You are about to drop the column `affiliate_network_id` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the `affiliate_networks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `redirect_type` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `offers` DROP FOREIGN KEY `offers_affiliate_network_id_fkey`;

-- DropForeignKey
ALTER TABLE `offers` DROP FOREIGN KEY `offers_group_id_fkey`;

-- DropIndex
DROP INDEX `offers_affiliate_network_id_idx` ON `offers`;

-- DropIndex
DROP INDEX `offers_group_id_idx` ON `offers`;

-- DropIndex
DROP INDEX `offers_type_idx` ON `offers`;

-- AlterTable
ALTER TABLE `offers` DROP COLUMN `affiliate_network_id`,
    DROP COLUMN `group_id`,
    DROP COLUMN `type`,
    ADD COLUMN `redirect_type` ENUM('HTTP_REDIRECT') NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL,
    MODIFY `countries` VARCHAR(191) NULL,
    MODIFY `payout_type` ENUM('CPA', 'CPC') NULL,
    MODIFY `allow_upsells` BOOLEAN NULL DEFAULT false,
    MODIFY `conversion_cap` BOOLEAN NULL DEFAULT false,
    MODIFY `preload_enabled` BOOLEAN NULL DEFAULT false,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `offerValues` JSON NULL;

-- DropTable
DROP TABLE `affiliate_networks`;

-- DropTable
DROP TABLE `groups`;
