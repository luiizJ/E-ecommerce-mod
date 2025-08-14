import { RemoveProductFromCart } from "@/app/actions/remove-product-to-cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEY } from "../queries/use-cart";

export const REMOVE_PRODUCT_FROM_CART_MUTATION_KEY = (cartItemId: string) =>
  ["remove-cart-product"] as const;

export const useRemoveProductFromCart = (cartItemId: string) => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationKey: REMOVE_PRODUCT_FROM_CART_MUTATION_KEY(cartItemId),
    mutationFn: () => RemoveProductFromCart({ cartItemId }),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
