"use client";
import { addProductToCart } from "@/app/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return (
    <div className="flex flex-col px-5">
      <Button
        className="rounded-lg"
        size={"lg"}
        variant={"outline"}
        disabled={isPending}
        onClick={() => mutate()}
      >
        {isPending && <Loader2 className="animate-spin" />}
        Adicionar ao carrinho
      </Button>
    </div>
  );
};

export default AddToCartButton;
