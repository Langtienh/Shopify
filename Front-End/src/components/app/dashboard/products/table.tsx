import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Record from "./record";
import RenderIf from "@/components/global/renderif";
import { Empty } from "antd";
import { AiFillProduct } from "react-icons/ai";
import Filter from "./filter";
import Search from "./search";
import { AddProduct } from "./button";
import MyPagination from "@/components/global/pagination";
import { getProduct } from "@/services/product";
import { Button } from "@/components/ui/button";
import { MdOutlineAutoDelete } from "react-icons/md";
import Link from "next/link";

type Props = {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  isDemo?: boolean;
};

export default async function ProductTable({
  isDemo,
  page,
  limit,
  category,
  search,
}: Props) {
  const { products, totalItem } = await getProduct(
    page,
    limit,
    category,
    undefined,
    "id:desc",
    search
  );
  return (
    <>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-t rounded-t-xl">
        <div className="flex">
          <AiFillProduct size={24} />
          <span className="pl-3 text-xl font-bold">Product Table</span>
        </div>
        <div className="ml-4">
          <Filter category={category} />
        </div>
        <div className="basis-[400px] ml-auto flex gap-4">
          <div className="flex-1"></div>
          <Search value={search} />
          <AddProduct />
          <Link href="/dashboard/products/deleted">
            <Button variant="ghost" size="icon">
              <MdOutlineAutoDelete size={28} />
            </Button>
          </Link>
        </div>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="*:font-bold *:text-center *:text-nowrap">
            <TableHead className="w-10"></TableHead>
            <TableHead className="w-16">Id</TableHead>
            <TableHead className="!text-start w-[380px]">
              Tên sản phẩm
            </TableHead>
            <TableHead className="w-24">Trạng thái</TableHead>
            <TableHead className="w-24">Giá</TableHead>
            <TableHead className="w-12">Kho</TableHead>
            <TableHead className="w-20">Lượt xem</TableHead>
            <TableHead className="w-20">Đánh giá</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <RenderIf renderIf={products.length}>
            {products.map((product) => (
              <Record isDemo={isDemo} product={product} key={product.id} />
            ))}
          </RenderIf>
        </TableBody>
      </Table>
      <RenderIf renderIf={!products.length}>
        <div className="flex justify-center py-10 w-full">
          <Empty description="Không tìm thấy" />
        </div>
      </RenderIf>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-b rounded-b-xl shadow-xl">
        <MyPagination pageSize={limit} current={page} total={totalItem} />
        <p className="font-bold">{`Tổng: ${totalItem} sản phẩm`}</p>
      </div>
    </>
  );
}
