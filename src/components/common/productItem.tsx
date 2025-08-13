import { formatMoney } from "@/app/helpers/formatedMoney";
import type { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  containerWidth?: string;
}

const ProductItem = ({ product, containerWidth }: ProductItemProps) => {
  const variantPosition = product.variants[0];
  return (
    <Link
      href={`/product/${variantPosition.slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        src={variantPosition.imageUrl}
        alt={variantPosition.name}
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-full rounded-3xl"
      />
      <div className={cn("flex max-w-[150px] flex-col gap-1", containerWidth)}>
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
