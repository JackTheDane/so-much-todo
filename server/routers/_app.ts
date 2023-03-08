import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  createToDo: procedure
    .input(
      z.object({
        label: z.string(),
      })
    )
    .mutation(({ input }) => {
      const prisma = new PrismaClient();

      return prisma.toDoItem.create({ data: input });
    }),

  setToDoCompletion: procedure
    .input(
      z.object({
        id: z.number(),
        completed: z.boolean(),
      })
    )
    .mutation(({ input: { id, completed } }) => {
      const prisma = new PrismaClient();

      return prisma.toDoItem.update({
        data: {
          completed,
        },
        where: {
          id,
        },
      });
    }),

  getToDos: procedure.query(() => {
    const prisma = new PrismaClient();

    return prisma.toDoItem.findMany();
  }),

  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
