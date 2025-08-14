import z from "zod";

export const decreaseProductQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseProductQuantitySchema = z.infer<
  typeof decreaseProductQuantitySchema
>;
