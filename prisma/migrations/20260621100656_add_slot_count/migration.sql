-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "visitType" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "slotsReserved" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Appointment" ("createdAt", "date", "description", "fullName", "id", "phone", "status", "time", "updatedAt", "visitType") SELECT "createdAt", "date", "description", "fullName", "id", "phone", "status", "time", "updatedAt", "visitType" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE TABLE "new_VisitType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slotCount" INTEGER NOT NULL DEFAULT 1,
    "minDuration" INTEGER NOT NULL DEFAULT 30,
    "maxDuration" INTEGER NOT NULL DEFAULT 60,
    "restMinutes" INTEGER NOT NULL DEFAULT 15,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_VisitType" ("createdAt", "id", "isActive", "maxDuration", "minDuration", "name", "restMinutes", "updatedAt") SELECT "createdAt", "id", "isActive", "maxDuration", "minDuration", "name", "restMinutes", "updatedAt" FROM "VisitType";
DROP TABLE "VisitType";
ALTER TABLE "new_VisitType" RENAME TO "VisitType";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
