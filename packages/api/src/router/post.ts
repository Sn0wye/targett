import { TRPCError } from '@trpc/server';
import { type Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { type Post } from '@targett/db';

import { publicProcedure, router } from '../trpc';

const getPostById = async (redis: Redis, postId: string) => {
  const postKey = `post:${postId}`;
  const post = await redis.hmget(postKey, 'title', 'content');

  if (!post) {
    return null;
  }

  return {
    id: postId,
    ...post
  } as Post;
};

export const postRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const postIds = await ctx.redis.smembers('postIds');
    const posts = [];
    for (const postId of postIds) {
      const post = await getPostById(ctx.redis, postId);
      if (post) {
        posts.push(post);
      }
    }
    return posts;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await getPostById(ctx.redis, input.id);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const postId = nanoid();
      const postKey = `post:${postId}`;
      await ctx.redis.hmset(postKey, {
        title: input.title,
        content: input.content
      });
      await ctx.redis.sadd('postIds', postId);

      const post = {
        id: postId,
        ...input
      } as Post;

      return post;
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const postId = input;
    const postKey = `post:${postId}`;
    const deleted = await ctx.redis.del(postKey);

    if (!deleted) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Post not found',
        cause: 'The post with the given "id" does not exist.'
      });
    }
    await ctx.redis.srem('postIds', postId);

    return { id: postId };
  })
});
