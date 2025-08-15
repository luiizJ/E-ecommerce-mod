import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CART_QUERY_KEY } from "../queries/use-cart";
import { finishOrder } from "@/app/actions/finish-order";

export const getUseFinishOrderMutationKey = () => ["finish-order"];

export const useFinishOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseFinishOrderMutationKey(),
    mutationFn: async () => {
      return await finishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
