-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT,
    "avatar" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "email" TEXT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "offers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "redirect_type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "countries" TEXT,
    "payout_type" TEXT,
    "payout_amount" REAL,
    "allow_upsells" BOOLEAN DEFAULT false,
    "conversion_cap" BOOLEAN DEFAULT false,
    "notes" TEXT,
    "preload_enabled" BOOLEAN DEFAULT false,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "offerValues" JSONB
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "offers_name_idx" ON "offers"("name");
