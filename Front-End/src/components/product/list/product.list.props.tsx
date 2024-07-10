import { getProductByCategoryAndBand } from "@/actions/product.services";
import ProductList from "@/components/product/list/product.list";
import MyPagination from "@/components/pagination/pagination";

export default async function ProductsListProps({
  category,
  page = 1,
  limit = 10,
  sort = "id:asc",
  pagination = false,
  filters,
  brand,
}: {
  category: string;
  page?: number;
  limit?: number;
  sort?: string;
  filters?: string;
  brand?: string;
  pagination?: boolean;
}) {
  const [products, totalItem] = await getProductByCategoryAndBand(
    category,
    limit,
    page,
    sort,
    filters,
    brand
  );
  return (
    <>
      <ProductList products={products} />
      {pagination && (
        <MyPagination current={page} pageSize={limit} total={totalItem} />
      )}
    </>
  );
}
