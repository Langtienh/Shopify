import NavBrand from "@/components/global/navBrand";
import MyPagination from "@/components/pagination/pagination";
import ProductList from "@/components/product/product.list";
import ProductSort from "@/components/product/sort";
import { get } from "@/services/axios.helper";

export async function generateStaticParams() {
  const res = await get<ResponseSuccess<CategoryResponse[]>>(`/categories`);
  const categories = res.data;
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
  const res = await get<ResponseSuccess<PageResponse<ProductResponse>>>(
    `/products?category=${params.category}&page=${PAGE}&limit=${LIMIT}&sort=${SORT}`
  );
  const products = res.data.result;
  return (
    <div className="flex flex-col gap-4">
      <NavBrand category={params.category} />
      <h2 className="text-lg font-bold ">Chọn theo tiêu chí</h2>
      <h2 className="text-lg font-bold ">Sắp xếp theo</h2>
      <ProductSort />
      <ProductList products={products} />
      <MyPagination
        current={PAGE}
        pageSize={LIMIT}
        total={res.data.totalItem}
      />
      <div></div>
      <div></div>
    </div>
  );
}
