import {
  ChartFilterByCategory,
  ProductChartCompare,
} from "@/app/_components/admin/dashboard/products/chart";
import ProductTable from "@/app/_components/admin/dashboard/products/table";
import { Suspense } from "react";
import ProductTableSkeleton from "@/app/_components/admin/dashboard/products/table.skeleton";

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
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartFilterByCategory />
        <ProductChartCompare />
        <div className="lg:col-span-2 shadow-xl">
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
      </div>
    </>
  );
}
