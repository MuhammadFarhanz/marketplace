import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    // .output(z.object({name: z.string(), image: z.string().nullable()}))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          name: true,
          image: true,
        },
      });
      return user;
    }),
});
