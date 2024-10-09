import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { z } from "zod";
import { env } from "~/env.mjs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { s3Client } from "../s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
        file: z.array(z.any()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, description, price, file, condition, location, category } =
        input;

      const product = await ctx.prisma.product.create({
        data: {
          name: name,
          price: price,
          description: description,
          image: {
            create: file.map((fileData) => ({
              url: `${env.S3_SERVER_ENDPOINT}/${
                env.S3_BUCKET
              }/${encodeURIComponent(fileData.key)}`,
              file: {
                create: {
                  fileName: fileData.fileName,
                  fileType: fileData.fileType,
                  url: fileData.key,
                  fileSize: fileData.fileSize,
                },
              },
            })),
          },
          condition: condition,
          location: location,
          category: category,
          authorId: ctx.session.user.id,
        },
      });
      return product;
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
          image: z.array(z.string()).optional(),
          file: z.any().optional(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, description, price, file, location, category } =
        input.newProductData;

      const existingImages = await ctx.prisma.image.findMany({
        where: { productId: input.id },
        select: { url: true },
      });

      const existingImageUrls = existingImages.map((img) => img.url);
      const newImageUrls = input.newProductData.image || [];

      const imagesToDelete = existingImageUrls.filter(
        (url) => !newImageUrls.includes(url)
      );

      // Only delete the images that are no longer part of the new image set
      if (imagesToDelete.length > 0) {
        await ctx.prisma.image.deleteMany({
          where: {
            productId: input.id,
            url: { in: imagesToDelete },
          },
        });
      }

      const productData: any = {
        name: name,
        description: description,
        price: price,
        category: category,
        location: location,
      };

      if (file && file.length > 0) {
        productData.image = {
          create: file.map((fileData: any) => ({
            url: `${env.S3_SERVER_ENDPOINT}/${
              env.S3_BUCKET
            }/${encodeURIComponent(fileData.key)}`,
            file: {
              create: {
                fileName: fileData.fileName,
                fileType: fileData.fileType,
                url: fileData.key,
                fileSize: fileData.fileSize,
              },
            },
          })),
        };
      }

      const product = await ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: productData,
        include: {
          image: true,
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
        image: {
          include: {
            file: true,
          },
        },
        price: true,
        condition: true,
        category: true,
        location: true,
      },
    });
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
          include: { items: true },
        }));

      let cartItem = await ctx.prisma.cartItem.findFirst({
        where: {
          cartId: cart?.id,
          productId: input.productId,
        },
      });

      if (cartItem) {
        return {
          status: "exists",
          message: "Item is already in the cart",
        };
      } else {
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
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        image: true,
      },
    });
  }),

  generatePresignedUrls: protectedProcedure
    .input(
      z.object({
        files: z.array(
          z.object({
            fileName: z.string(),
            fileType: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { files } = input;
      const bucketName = env.S3_BUCKET;

      const presignedUrls = await Promise.all(
        files.map(async (file) => {
          const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: file.fileName,
            ContentType: file.fileType,
            ACL: "public-read",
          });

          return getSignedUrl(s3Client, command, { expiresIn: 3000 });
        })
      );

      // Return URLs for front-end to use, including real URLs
      return files.map((file, index) => ({
        url: presignedUrls[index],
        key: file.fileName,
      }));
    }),
});
