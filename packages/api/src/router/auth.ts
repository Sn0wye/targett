import { User } from '@clerk/nextjs/api';

import { protectedProcedure, publicProcedure, router } from '../trpc';

const filterUser = (user?: User) => {
  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePic: user.profileImageUrl,
    username: user.username
  };
};

export const authRouter = router({
  getSession: protectedProcedure.query(({ ctx }) => {
    return filterUser(ctx.auth.user);
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can see this secret message!';
  })
});
