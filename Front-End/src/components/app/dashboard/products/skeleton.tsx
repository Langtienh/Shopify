import { AiFillProduct } from "react-icons/ai";
import Filter from "./filter";
import Search from "./search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyPagination from "@/components/global/pagination";
import { AddProduct } from "./button";

export default function ProductTableSkeleton() {
  return (
    <>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-t rounded-t-xl">
        <div className="flex">
          <AiFillProduct size={24} />
          <span className="pl-3 text-xl font-bold">Product Table</span>
        </div>
        <div className="ml-4">
          <Filter category={undefined} />
        </div>
        <div className="basis-[400px] ml-auto flex gap-4">
          <div className="flex-1"></div>
          <Search value="" />
          <AddProduct />
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
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
        </TableBody>
      </Table>

      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-b rounded-b-xl shadow-xl">
        <MyPagination pageSize={10} current={1} total={50} />
        <p className="font-bold">{`Tổng: ${0} sản phẩm`}</p>
      </div>
    </>
  );
}

const Row = () => {
  return (
    <>
      <TableRow className="hover:bg-gray-50 animate-pulse *:text-center">
        <TableCell>
          <div className="h-7 w-6 rounded bg-gray-100" />
        </TableCell>
        <TableCell className="font-bold">
          <div className="h-7 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="h-7 text-start rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="h-7 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="h-7 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="h-7 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="h-7 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="h-7 rounded bg-gray-100" />
        </TableCell>
        <TableCell className="flex gap-3 justify-center items-center">
          <div className="h-7 w-6 rounded bg-gray-100" />
          <div className="h-7 w-6 rounded bg-gray-100" />
        </TableCell>
      </TableRow>
    </>
  );
};
