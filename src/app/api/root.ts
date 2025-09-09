//Combining all the routes into one 
import { projectRouter } from "./routers/protecter";
import { router } from "./trpc";


export const appRouter = router({
  project: projectRouter
});

export type AppRouter = typeof appRouter;
