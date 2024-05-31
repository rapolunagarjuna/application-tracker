/*
  Warnings:

  - Added the required column `date` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "status" INTEGER NOT NULL
);
INSERT INTO "new_Application" ("id", "jobDescription", "resume", "status", "title") SELECT "id", "jobDescription", "resume", "status", "title" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_key_check("Application");
PRAGMA foreign_keys=ON;
