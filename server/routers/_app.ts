import { toDoRouter } from './toDo';
import { router } from "../trpc";

export const appRouter = router({
  toDo: toDoRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
