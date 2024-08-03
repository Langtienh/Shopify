import { Suspense } from "react";
import CardWrapper from "../_ui/cart.wrapper";
import LatestInvoices from "../_ui/latest.invoices";
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from "../_ui/skeleton";
import RevenueChart from "../_ui/revenue.chart";

export default async function Page() {
  return (
    <>
      <h2 className="font-bold text-4xl py-2 text-blue-500">Bảng điều khiển</h2>
      <CardWrapper />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
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
