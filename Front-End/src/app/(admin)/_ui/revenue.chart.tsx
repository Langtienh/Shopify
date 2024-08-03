// import { fetchRevenue } from "@/app/lib/data";
import { FaRegCalendar } from "react-icons/fa";
import { InvoiceChart } from "./invoice.chart";

export default async function RevenueChart() {
  // const revenue = await fetchRevenue();

  // if (!revenue || revenue.length === 0) {
  //   return <p className="mt-4 text-gray-400">No data available.</p>;
  // }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Số lượng khách hàng tăng</h2>
      <div className="rounded-t-xl p-4 bg-gray-50">
        <InvoiceChart />
      </div>
      <div className="rounded-b-xl bg-gray-50 p-4">
        <div className="flex items-center pb-2 pt-6">
          <FaRegCalendar className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">7 ngày gần nhất</h3>
        </div>
      </div>
    </div>
  );
}
