import { Suspense } from "react";
import {
  CardWrapper,
  LatestInvoices,
  RevenueChart,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
  ViewCountProduct,
} from "@/app/_components/admin/dashboard";

export default async function Page() {
  return (
    <>
      <h2 className="font-bold text-4xl py-2 text-blue-500">Bảng điều khiển</h2>
      <CardWrapper />
      <div className="mt-6 grid xl:grid-cols-2 gap-5">
        <ViewCountProduct />
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </>
  );
}
