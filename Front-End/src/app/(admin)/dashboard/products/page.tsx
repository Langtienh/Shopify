import Link from "next/link";
import { ChartFilterByCategory, ProductChartCompare } from "./_ui/chart";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { getProduct } from "@/services/product";
import MyPagination from "@/components/pagination/pagination";
import { Input } from "antd";
import { AiFillProduct } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { AddProduct } from "./_ui/button";
import ProductTable from "./_ui/table";

type PropsType = {
  searchParams: {
    page?: number;
    limit?: number;
    query?: string;
    category?: string;
    brand?: string;
    search?: string;
  };
};
export default async function Page({
  searchParams: { page, limit, query, category, brand, search },
}: PropsType) {
  const _limit = limit || 10;
  const _page = page || 1;
  const { products, totalItem } = await getProduct(
    _page,
    _limit,
    category,
    brand,
    "id:desc",
    search
  );
  return (
    <>
      <div className="grid gap-5 xl:grid-cols-2">
        <ChartFilterByCategory />
        <ProductChartCompare />
        <div className="col-span-2 shadow-xl">
          <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-t rounded-t-xl">
            <div className="flex">
              <AiFillProduct size={24} />
              <span className="pl-3 text-xl font-bold">Product Table</span>
            </div>
            <div className="basis-[400px] ml-auto flex gap-4">
              <div className="flex-1"></div>
              <Input placeholder="Search" allowClear prefix={<IoSearch />} />
              <AddProduct />
            </div>
          </div>
          <ProductTable products={products} />
          <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-b rounded-b-xl shadow-xl">
            <MyPagination pageSize={_limit} current={_page} total={totalItem} />
            <p className="font-bold">{`Tổng: ${totalItem} sản phẩm`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
