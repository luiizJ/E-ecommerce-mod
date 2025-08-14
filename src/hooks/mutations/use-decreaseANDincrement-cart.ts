import { decreaseProductQuantity } from "@/app/actions/decrease-cart-product-quantity";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CART_QUERY_KEY } from "../queries/use-cart";
import { addProductToCart } from "@/app/actions/add-cart-product";

export const DESCREASE_PRODUCT_QUANTITY_MUTATION_KEY = (cartItemId: string) =>
  ["decrease-product-quantity", cartItemId] as const;

export const INCREMENT_PRODUCT_QUANTITY_MUTATION_KEY = (cartItemId: string) =>
  ["increment-cart-product-quantity", cartItemId] as const;

export const useDecrementCartFromProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: DESCREASE_PRODUCT_QUANTITY_MUTATION_KEY(cartItemId),
    mutationFn: () => decreaseProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};

export const useIncrementCartFromProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: INCREMENT_PRODUCT_QUANTITY_MUTATION_KEY(productVariantId),
    mutationFn: () =>
      addProductToCart({ productVariantId: productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
