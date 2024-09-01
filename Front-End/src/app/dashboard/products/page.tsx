import ProductTable from "@/components/app/dashboard/products/table";
import { Suspense } from "react";
import ProductTableSkeleton from "@/components/app/dashboard/products/skeleton";

type PropsType = {
  searchParams: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  };
};
export default async function Page({
  searchParams: { page, limit, category, search },
}: PropsType) {
  const _limit = limit || 10;
  const _page = page || 1;
  return (
    <>
      <div className="lg:col-span-12 shadow-xl">
        <Suspense
          key={`${_limit}${page}${category}${search}`}
          fallback={<ProductTableSkeleton />}
        >
          <ProductTable
            limit={_limit}
            page={_page}
            category={category}
            search={search}
          />
        </Suspense>
      </div>
    </>
  );
}
