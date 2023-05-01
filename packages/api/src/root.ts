import { authRouter } from './router/auth';
import { goalRouter } from './router/goal';
import { router } from './trpc';

export const appRouter = router({
  goal: goalRouter,
  auth: authRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
