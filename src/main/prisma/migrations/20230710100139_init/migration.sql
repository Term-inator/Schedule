/*
  Warnings:

  - You are about to drop the column `endHour` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `endMin` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the column `startMin` on the `Time` table. All the data in the column will be lost.
  - Added the required column `endMark` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMark` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Time" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scheduleId" INTEGER NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "startMark" TEXT NOT NULL,
    "endMark" TEXT NOT NULL,
    "timeZone" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    CONSTRAINT "Time_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Time" ("created", "deleted", "done", "end", "id", "scheduleId", "start", "timeZone", "updated") SELECT "created", "deleted", "done", "end", "id", "scheduleId", "start", "timeZone", "updated" FROM "Time";
DROP TABLE "Time";
ALTER TABLE "new_Time" RENAME TO "Time";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
