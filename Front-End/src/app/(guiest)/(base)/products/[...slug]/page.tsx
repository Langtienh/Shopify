import { Suspense } from "react";
import ProductListSkeleton from "@/components/product/item/skeleton";
import ProductsListPage from "@/app/(guiest)/(base)/products/_components/product/product.list.page";
import { SlugParams } from "@/app/(guiest)/(base)/products/[...slug]/layout";

type TSearchParams = {
  page?: number;
  limit?: number;
  sort?: string;
  filters?: string;
};

export type ProductListPage = {
  category: string;
  brand?: string;
} & TSearchParams;

export default function Page({
  params,
  searchParams,
}: {
  params: SlugParams;
  searchParams: TSearchParams;
}) {
  const [category, brand] = params.slug;
  const categoryCP = category?.replace(".html", "");
  const brandCP = brand?.replace(".html", "");
  return (
    <Suspense
      key={`${params.slug[0]}${params.slug[1] || ""}${searchParams.filters}${
        searchParams.limit
      }${searchParams.page}${searchParams.sort}`}
      fallback={<ProductListSkeleton count={10} />}
    >
      <ProductsListPage
        page={searchParams.page}
        limit={searchParams.limit}
        sort={searchParams.sort}
        filters={searchParams.filters}
        category={categoryCP}
        brand={brandCP}
      />
    </Suspense>
  );
}
