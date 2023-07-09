-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timeCode" TEXT NOT NULL,
    "action" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Time" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scheduleId" INTEGER NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "startHour" BOOLEAN NOT NULL,
    "startMin" BOOLEAN NOT NULL,
    "endHour" BOOLEAN NOT NULL,
    "endMin" BOOLEAN NOT NULL,
    "timeZone" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Time_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
