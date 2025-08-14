import { ShoppingBasketIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/app/actions/get-cart";
import CartItem from "./cartItem";

export const Cart = () => {
  const { data, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <ShoppingBasketIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 px-5">
            {isPending && <div>Carregando</div>}
            {data?.items.map((itemCart) => (
              <CartItem
                key={itemCart.id}
                id={itemCart.id}
                productName={itemCart.productVariant.productId}
                productVariantImage={itemCart.productVariant.imageUrl}
                productVariantName={itemCart.productVariant.name}
                productVariantTotalPrice={itemCart.productVariant.priceInCents}
                quantity={itemCart.quantity}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
