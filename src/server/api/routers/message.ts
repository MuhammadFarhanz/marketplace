import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  // Fetch conversations for the authenticated user
  conversations: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.conversationUser.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        conversation: {
          include: {
            conversationUsers: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
            lastMessage: true,
          },
        },
      },
      orderBy: {
        conversation: {
          lastMessageId: "desc",
        },
      },
    });
  }),
  // Find a conversation between two users
  findConversation: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId }, ctx }) => {
      //U1 conversations: [c1, c2]
      //U2 conversations: [c1]
      //[(c1:u2, c1:u1), (c2:u1)]
      const conversationUser = await ctx.prisma.conversationUser.groupBy({
        by: ["conversationId"],
        where: {
          userId: {
            in: [userId, ctx.session.user.id],
          },
        },
        having: {
          userId: {
            _count: {
              equals: 2,
            },
          },
        },
      });
      return conversationUser.length
        ? conversationUser[0]?.conversationId
        : null;
    }),
  // Fetch messages for a specific conversation
  messages: protectedProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ input: { conversationId }, ctx }) => {
      await ctx.prisma.conversationUser.findUniqueOrThrow({
        where: {
          userId_conversationId: {
            userId: ctx.session.user.id,
            conversationId,
          },
        },
      });
      return ctx.prisma.message.findMany({
        where: {
          conversationId,
        },
        orderBy: {
          id: "asc",
        },
      });
    }),
  // Send a new message to a conversation
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.string().nullish(),
        messageText: z.string(),
        userId: z.string().nullish(),
      })
    )
    .mutation(
      async ({ input: { messageText, conversationId, userId }, ctx }) => {
        if (!conversationId) {
          if (!userId) {
            throw new Error("No recipient passed");
          }

          return ctx.prisma.$transaction(async (trx) => {
            const conversation = await trx.conversation.create({
              data: {
                messages: {
                  create: {
                    message: messageText,
                    userId: ctx.session.user.id,
                  },
                },
                conversationUsers: {
                  createMany: {
                    data: [{ userId }, { userId: ctx.session.user.id }],
                  },
                },
              },
              include: {
                messages: true,
              },
            });

            await trx.conversation.update({
              data: {
                lastMessageId: conversation.messages[0]!.id,
              },
              where: {
                id: conversation.id,
              },
            });

            //  ctx.ee.emit('sendMessage',{
            //   conversationId: conversation.id,
            //   userId,
            //  });

            return conversation;
          });
        }

        await ctx.prisma.$transaction(async (trx) => {
          const [message] = await Promise.all([
            trx.message.create({
              data: {
                message: messageText,
                userId: ctx.session.user.id,
                conversationId,
              },
            }),
            trx.conversationUser.findUniqueOrThrow({
              where: {
                userId_conversationId: {
                  userId: ctx.session.user.id,
                  conversationId,
                },
              },
            }),
          ]);

          await trx.conversation.update({
            data: {
              lastMessageId: message.id,
            },
            where: {
              id: conversationId,
            },
          });
        });

        const user = await ctx.prisma.conversationUser.findFirst({
          where: {
            conversationId,
            NOT: {
              userId: ctx.session.user.id,
            },
          },
          select: {
            userId: true,
          },
        });
        // ctx.ee.emit('sendMessage', {conversationId, userId: user!.userId})
      }
    ),

  // Subscribe to real-time messages being sent
  // onSendMessage: protectedProcedure.subscription(({ ctx }) => {
  //   return observable<{conversationId: string}>((emit) => {
  //     const onSendMessage = (data: { conversationId: string, userId: string}) => {
  //       if(data.userId === ctx.session.user.id){
  //         emit.next({conversationId: data.conversationId})
  //       }
  //     }
  //     ctx.ee.on('sendMessage',onSendMessage)

  //     return () => {
  //       ctx.ee.off('sendMessage',onSendMessage)
  //     }

  //   })

  // })
});
