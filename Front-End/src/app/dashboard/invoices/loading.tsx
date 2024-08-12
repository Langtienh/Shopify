import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyPagination, { OptionPageSize } from "@/components/global/pagination";
import { MdLaptopChromebook } from "react-icons/md";
import { Input } from "antd";
import { IoSearch } from "react-icons/io5";

export default function Loading() {
  return (
    <>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-t rounded-t-xl">
        <div className="flex">
          <MdLaptopChromebook size={30} />
          <span className="pl-3 text-xl font-bold">Invoices Table</span>
        </div>
        <div className="basis-[300px] ml-auto">
          <Input placeholder="Tìm kiếm" allowClear prefix={<IoSearch />} />
        </div>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="*:font-bold">
            <TableHead className="w-[80px]">Id</TableHead>
            <TableHead className="w-[150px]">Tổng tiền</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            <TableHead className="w-[250px] text-center">Trạng thái</TableHead>
            <TableHead className="w-[100px] text-center"></TableHead>
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
        <OptionPageSize limit={10} />
      </div>
    </>
  );
}

const Row = () => {
  return (
    <>
      <TableRow className="hover:bg-gray-50 animate-pulse">
        <TableCell>
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="h-6 w-3/4 rounded bg-gray-100" />
        </TableCell>
        <TableCell>
          <div className="flex w-[200px] gap-8">
            <div className="h-6 w-24 rounded bg-gray-100" />
            <div className="h-6 w-6 rounded bg-gray-100" />
          </div>
        </TableCell>
        <TableCell>
          <div className="h-6 w-20 rounded bg-gray-100" />
        </TableCell>
      </TableRow>
    </>
  );
};
