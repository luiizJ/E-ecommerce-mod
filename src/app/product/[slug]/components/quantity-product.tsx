"use client";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const QuantityProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    return setQuantity((previus) => previus + 1);
  };
  const handleDecrement = () => {
    return setQuantity((previus) => (previus > 1 ? previus - 1 : 1));
  };

  return (
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
  );
};

export default QuantityProduct;
