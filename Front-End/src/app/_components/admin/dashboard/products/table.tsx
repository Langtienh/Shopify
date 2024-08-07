import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Record from "./record";
import RenderIf from "@/components/renderif";
import { Empty } from "antd";
import { AiFillProduct } from "react-icons/ai";
import Filter from "./filter";
import Search from "./search";
import { AddProduct } from "./button";
import MyPagination from "@/components/pagination/pagination";
import { getProduct } from "@/services/product";

type Props = {
  page: number;
  limit: number;
  category?: string;
  search?: string;
};

export default async function ProductTable({
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
        </div>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="*:font-bold">
            <TableHead></TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-center">Giá</TableHead>
            <TableHead className="text-center">Kho</TableHead>
            <TableHead className="text-center">Lượt xem</TableHead>
            <TableHead className="text-center">Đánh giá</TableHead>
            <TableHead className="w-[120px] text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <RenderIf renderIf={!!products.length}>
            {products.map((product) => (
              <Record product={product} key={product.id} />
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
