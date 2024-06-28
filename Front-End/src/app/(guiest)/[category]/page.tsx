import NavBrand from "@/components/global/navBrand";
import ProductList from "@/components/product/product.list";
import { get } from "@/services/axios.helper";
import { translateCategory } from "@/utils/translate";

export async function generateStaticParams() {
  const categories = await get<TCategory[]>(`/categories`);

  return categories.map((category) => ({
    category: category.category,
  }));
}

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const products = await get<TProduct[]>(
    `/products?category=${params.category}`
  );
  return (
    <>
      {translateCategory(params.category) + " của chúng tôi"}
      <NavBrand category={params.category} />
      <h2 className="text-lg font-bold text-red-500">Filter???</h2>
      <ProductList products={products} />
    </>
  );
}
