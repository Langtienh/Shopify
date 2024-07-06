import NavBrand from "@/components/global/nav.brand";
import MyPagination from "@/components/pagination/pagination";
import ProductFilter from "@/components/product/product.filters";
import ProductList from "@/components/product/product.list";
import ProductSort from "@/components/product/product.sort";
import {
  getAllCategory,
  getProductByCategory,
} from "@/actions/product.services";

export async function generateStaticParams() {
  const categories = await getAllCategory();
  return categories.map((category) => ({
    category: category.name,
  }));
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page?: number; limit?: number; sort?: string };
}) {
  const PAGE = searchParams?.page ?? 1;
  const LIMIT = searchParams?.limit ?? 10;
  const SORT = searchParams?.sort ?? "id:asc";
  const [products, totalItem] = await getProductByCategory(
    params.category,
    LIMIT,
    PAGE,
    SORT
  );
  return (
    <div className="flex flex-col gap-4">
      <NavBrand category={params.category} />
      <h2 className="text-lg font-bold ">Chọn theo tiêu chí</h2>
      <ProductFilter category={params.category} />
      <h2 className="text-lg font-bold ">Sắp xếp theo</h2>
      <ProductSort />
      <ProductList products={products} />
      <MyPagination current={PAGE} pageSize={LIMIT} total={totalItem} />
      <div></div>
      <div></div>
    </div>
  );
}
