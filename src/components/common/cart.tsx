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
import Image from "next/image";

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
          <div>
            {isPending && <div>Carregando</div>}
            {data?.items.map((itemCart) => (
              <div key={itemCart.id}>
                <Image
                  src={itemCart.productVariant.imageUrl}
                  alt={itemCart.productVariant.name}
                  width={100}
                  height={100}
                />
                <div>
                  {" "}
                  <h3>{itemCart.productVariant.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
