"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { decreaseProductQuantitySchema } from "./schema";
import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";

export const decreaseProductQuantity = async (
  data: z.infer<typeof decreaseProductQuantitySchema>,
) => {
  decreaseProductQuantitySchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });
  if (!cartItem) {
    throw new Error("Cart Item not found");
  }
  const cartDoesntBelongToUser = cartItem.cart.userId !== session.user.id;
  if (cartDoesntBelongToUser) {
    throw new Error("Unauthorized");
  }
  if (cartItem.quantity === 1) {
    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
    return;
  }
  await db
    .update(cartItemTable)
    .set({ quantity: cartItem.quantity - 1 })
    .where(eq(cartItemTable.id, cartItem.id));
};
