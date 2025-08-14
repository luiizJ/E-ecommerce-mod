import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatMoney } from "@/app/helpers/formatedMoney";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RemoveProductFromCart } from "@/app/actions/remove-product-to-cart";
import { decreaseProductQuantity } from "@/app/actions/decrease-cart-product-quantity";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId?: string;
  productVariantName: string;
  productVariantImage: string;
  productVariantTotalPrice: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantImage,
  productVariantName,
  productVariantTotalPrice,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => RemoveProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const decreaseProductQuantityMutation = useMutation({
    mutationKey: ["decrease-product-quantity"],
    mutationFn: () => decreaseProductQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const handleDeleteOnClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Ocorreu um erro ao remover o produto do carrinho.");
      },
    });
  };
  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto diminuida.");
      },
    });
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImage}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                handleDecreaseProductQuantity();
              }}
            >
              <MinusIcon />
            </Button>
            <span className="text-xs font-semibold">{quantity}</span>
            <Button
              className="h-4 w-4"
              size={"icon"}
              variant={"ghost"}
              onClick={() => {}}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant={"outline"} size={"icon"} onClick={handleDeleteOnClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatMoney(productVariantTotalPrice)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
