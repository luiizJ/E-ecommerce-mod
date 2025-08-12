import { formatMoney } from "@/app/helpers/formatedMoney";
import type { productTable, productVariantTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variant: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const variantPosition = product.variant[0];
  return (
    <Link href="/" className="flex flex-col gap-4">
      <Image
        src={variantPosition.imageUrl}
        alt={variantPosition.name}
        width={150}
        height={150}
        className="rounded-3xl"
      />
      <div className="flex max-w-[150px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatMoney(variantPosition.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
