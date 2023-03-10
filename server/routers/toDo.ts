import { procedure, router } from "../trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export const toDoRouter = router({
  create: procedure
    .input(
      z.object({
        label: z.string(),
      })
    )
    .mutation(({ input }) => {
      const prisma = new PrismaClient();

      return prisma.toDoItem.create({ data: input });
    }),

  delete: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input: { id } }) => {
      const prisma = new PrismaClient();

      return prisma.toDoItem.delete({ where: { id } });
    }),

  update: procedure
    .input(
      z.object({
        id: z.number(),
        label: z.string().optional(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(({ input: { id, completed, label } }) => {
      const prisma = new PrismaClient();

      return prisma.toDoItem.update({
        data: {
          completed,
          label,
        },
        where: {
          id,
        },
      });
    }),

  get: procedure.query(() => {
    const prisma = new PrismaClient();

    return prisma.toDoItem.findMany();
  }),
});
