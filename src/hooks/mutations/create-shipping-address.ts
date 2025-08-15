import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShippingAddress } from "@/app/actions/create-shipping-address";
import { CART_QUERY_KEY } from "../queries/use-cart";

export const getCreateShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: createShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
};
