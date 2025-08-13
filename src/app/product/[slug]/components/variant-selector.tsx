import type { productVariantTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

interface VariantSelectorProps {
  variants: (typeof productVariantTable.$inferInsert)[];
  selectedVariantSlug: string;
}

const VariantSelector = ({
  variants,
  selectedVariantSlug,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product/${variant.slug}`}
          key={variant.id}
          className={
            selectedVariantSlug === variant.slug
              ? "rounded-xl border-2 border-blue-500"
              : "border-2 border-transparent"
          }
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
