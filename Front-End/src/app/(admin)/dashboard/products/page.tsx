import Link from "next/link";
import {
  ChartFilterByCategory,
  ProductChartCompare,
  ViewCountProduct,
} from "./_ui/chart";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

export default function Page() {
  return (
    <>
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="xl:col-span-2">
          <ViewCountProduct />
        </div>
        <ChartFilterByCategory />
        <ProductChartCompare />
      </div>
      <Link
        href="/dashboard/products/table"
        className="p-3 text-3xl text-center font-bold text-blue-600 hover:text-blue-500 w-full flex items-center gap-4 mb-10 mt-5"
      >
        <TbPlayerTrackNextFilled size={39} />
        <span>Quản lý sản phẩm</span>
      </Link>
    </>
  );
}
