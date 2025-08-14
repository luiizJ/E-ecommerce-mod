import { ShoppingBasketIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import CartItem from "./cartItem";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { formatMoney } from "@/app/helpers/formatedMoney";
import { UseCart } from "@/hooks/queries/use-cart";

export const Cart = () => {
  const { data } = UseCart();
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
          <div className="flex h-full flex-col gap-8 px-5 pb-6">
            <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex h-full flex-col gap-8">
                  {data?.items.map((itemCart) => (
                    <CartItem
                      key={itemCart.id}
                      id={itemCart.id}
                      productVariantId={itemCart.productVariant.id}
                      productName={itemCart.productVariant.product.name}
                      productVariantImage={itemCart.productVariant.imageUrl}
                      productVariantName={itemCart.productVariant.name}
                      productVariantTotalPrice={
                        itemCart.productVariant.priceInCents
                      }
                      quantity={itemCart.quantity}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
            {data?.items && data?.items.length > 0 && (
              <div className="flex flex-col gap-4">
                <Separator />
                <div className="items-center-text-xs flex justify-between font-medium">
                  <p>Total</p>
                  <p>{formatMoney(data?.totalPriceInCents ?? 0)}</p>
                </div>
                <Separator />
                <Button className="mt-5 rounded-full">Finalizar Compra</Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
