-- CreateTable
CREATE TABLE "ToDoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
