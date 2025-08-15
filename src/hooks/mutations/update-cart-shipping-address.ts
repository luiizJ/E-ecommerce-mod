import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CART_QUERY_KEY } from "../queries/use-cart";
import type { UpdateCartShippingAddressSchema } from "@/app/actions/update-cart-shipping-address/schema";
import { updateCartShippingAddress } from "@/app/actions/update-cart-shipping-address";

export const getUpdateCartShippingAddressMutationKey = () => [
  "update-cart-shipping-address",
];

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    mutationFn: (data: UpdateCartShippingAddressSchema) =>
      updateCartShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
};
