import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShippingAddress } from "@/app/actions/create-shipping-address";
import { GET_USER_ADRRESSES_QUERY_KEY } from "../queries/use-user-address";

export const getCreateShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: createShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_USER_ADRRESSES_QUERY_KEY(),
      });
    },
  });
};
