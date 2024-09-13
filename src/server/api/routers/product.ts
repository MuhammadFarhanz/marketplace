import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        author: true,
        price: true,
      },
      take: 20,
    });
  }),
  getProductById: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findUnique({
        where: {
          id: input.productId,
        },
        include: {
          image: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        image: z.array(z.string()),
        condition: z.string(),
        location: z.string(),
        category: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const images = input.image.map((imageUrl) => ({ url: imageUrl }));
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          image: {
            create: images,
          },
          condition: input.condition,
          location: input.location,
          category: input.category,
          authorId: ctx.session.user.id,
        },
      });
      return product;
    }),

  getAllProductById: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
      select: {
        name: true,
        id: true,
        description: true,
        image: true,
        price: true,
        condition: true,
        category: true,
        location: true,
      },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        newProductData: z.object({
          name: z.string(),
          description: z.string(),
          price: z.number(),
          category: z.string(),
          location: z.string(),
          image: z.array(z.string()),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.image.deleteMany({
        where: { productId: input.id },
      });

      // Create image objects for the new images
      const images = input.newProductData.image.map((imageUrl) => ({
        url: imageUrl,
      }));

      const product = await ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.newProductData.name,
          description: input.newProductData.description,
          price: input.newProductData.price,
          category: input.newProductData.category,
          location: input.newProductData.location,
          image: {
            create: images,
          },
        },
        include: {
          image: true,
        },
      });
      return product;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
      return product;
    }),

  search: protectedProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: {
          name: {
            contains: input.search,
            mode: "insensitive",
          },
        },
        include: {
          image: true,
        },
      });
    }),

  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1).default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Find or create a cart for the user
      let cart =
        (await ctx.prisma.cart.findFirst({
          where: { userId },
          include: { items: true },
        })) ||
        (await ctx.prisma.cart.create({
          data: {
            userId,
            totalCart: 0,
          },
          include: { items: true }, // Make sure to include items when creating a new cart
        }));

      let cartItem = await ctx.prisma.cartItem.findFirst({
        where: {
          cartId: cart?.id,
          productId: input.productId,
        },
      });

      if (cartItem) {
        // Return early if the product is already in the cart
        return {
          status: "exists",
          message: "Item is already in the cart",
        };
      } else {
        // Add new product to the cart
        cartItem = await ctx.prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: input.productId,
            quantity: 1,
          },
        });
      }
    }),

  getCart: protectedProcedure.query(({ ctx }) => {
    const cart = ctx.prisma.cartItem.findMany({
      where: {
        cart: {
          userId: ctx.session.user.id,
        },
      },
      include: {
        product: {
          include: {
            image: true,
          },
        },
      },
    });

    return cart;
  }),

  deleteCart: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const cart = await ctx.prisma.cart.findFirst({
        where: { userId },
      });

      if (!cart) {
        throw new Error("Cart not found");
      }

      await ctx.prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId: input.productId,
        },
      });

      return { success: true, message: "All items deleted from the cart" };
    }),

  getRandomProducts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      take: 6, // Limit the number of products to 6
      orderBy: {
        createdAt: "desc", // You can change this to a random order if desired
      },
      include: {
        image: true,
      },
    });
  }),
});
