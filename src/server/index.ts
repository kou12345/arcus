import { helloRouter } from "./routers/helloRouter";
import { router } from "./trpc";

export const appRouter = router({
    hello: helloRouter,
})

export type AppRouter = typeof appRouter;
