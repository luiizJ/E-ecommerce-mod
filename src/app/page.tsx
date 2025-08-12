import CategorySelector from "@/components/common/category-selector";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import Image from "next/image";

const Home = async () => {
  const products = (
    await db.query.productTable.findMany({
      with: {
        variants: true,
        category: true,
      },
    })
  ).map((product) => ({
    ...product,
    variant: product.variants, // Rename 'variants' to 'variant'
  }));
  const categories = await db.query.categoryTable.findMany();
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner.png"
            alt="Hero Image"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <ProductList title="mais vendidos" products={products} />
        <div className="px5">
          <CategorySelector categories={categories} />
        </div>
        <div className="px-5">
          <Image
            src="/banner01.png"
            alt="Hero Image"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
