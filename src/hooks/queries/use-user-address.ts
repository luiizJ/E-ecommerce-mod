import { useQuery } from "@tanstack/react-query";

import { shippingAddressTable } from "@/db/schema";
import { getUserAddresses } from "@/app/actions/get-user-addresses";

export const GET_USER_ADRRESSES_QUERY_KEY = () => ["user-addresses"] as const;

export const useUserAddresses = (params?: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: GET_USER_ADRRESSES_QUERY_KEY(),
    queryFn: getUserAddresses,
    initialData: params?.initialData,
  });
};
