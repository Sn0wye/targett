import { protectedProcedure, publicProcedure, router } from '../trpc';

// const filterUser = (user: User) => {
//   if (!user) return null;

//   return {
//     id: user.id,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     profilePic: user.profileImageUrl,
//     username: user.username,
//   };
// };

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.userId;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can see this secret message!';
  })
});
