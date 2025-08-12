import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
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
  const newlyCreatedProducts = (
    await db.query.productTable.findMany({
      orderBy: [desc(productTable.createdAt)],
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
        <ProductList title="Mais Vendidos" products={products} />
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
        <ProductList title="Novidades" products={newlyCreatedProducts} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
