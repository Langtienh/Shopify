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
import MyPagination from "@/components/pagination/pagination";

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
          <Search />
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
      <TableRow className="hover:bg-gray-50 animate-pulse">
        <TableCell>
          <div className="h-6 w-6 rounded bg-gray-100" />
        </TableCell>
        <TableCell className="font-bold">
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="font-bold capitalize max-w-[350px] line-clamp-1 text-nowrap">
            <div className="h-6 w-3/4 rounded bg-gray-100" />
          </div>
        </TableCell>
        <TableCell className="text-center">
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell className="text-center">
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell className="text-center">
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell className="text-center">
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell className="text-center">
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell className="flex gap-3 justify-center items-center">
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
      </TableRow>
    </>
  );
};
