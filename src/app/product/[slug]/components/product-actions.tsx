"use client";

import { useState } from "react";
import AddToCartButton from "./add-toCart-button";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    return setQuantity((previus) => previus + 1);
  };
  const handleDecrement = () => {
    return setQuantity((previus) => (previus > 1 ? previus - 1 : 1));
  };
  return (
    <>
      <div className="px-5">
        <div className="space-y-2">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button size={"icon"} variant={"ghost"} onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <span className="text-lg font-semibold">{quantity}</span>
            <Button size={"icon"} variant={"ghost"} onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col px-5 pt-3.5">
          <Button className="rounded-lg" size={"lg"} variant={"default"}>
            Comprar Agora
          </Button>
        </div>
      </div>
      <div className="flex flex-col px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
      </div>
    </>
  );
};

export default ProductActions;
