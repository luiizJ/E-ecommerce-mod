import { ShoppingBasketIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export const Cart = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <ShoppingBasketIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>Cart Content </SheetContent>
      </Sheet>
    </>
  );
};
