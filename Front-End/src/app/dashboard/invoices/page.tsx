import { getInvoice } from "@/services/invoice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditStatus, View } from "@/components/app/dashboard/invoices/button";
import MyPagination, { OptionPageSize } from "@/components/global/pagination";
import { Input } from "antd";
import { IoSearch } from "react-icons/io5";
import { MdLaptopChromebook } from "react-icons/md";

type PropsType = {
  searchParams: {
    page?: number;
    limit?: number;
  };
};
export default async function Page({
  searchParams: { page, limit },
}: PropsType) {
  const PAGE = page || 1;
  const LIMIT = limit || 10;
  const { invoices, totalItem } = await getInvoice(LIMIT, PAGE);
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-bold">{invoice.id}</TableCell>
              <TableCell>{invoice.totalPrice}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>
                <EditStatus status={invoice.orderStatus} id={invoice.id} />
              </TableCell>
              <TableCell>
                <View id={invoice.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-b rounded-b-xl shadow-xl">
        <MyPagination pageSize={LIMIT} current={PAGE} total={totalItem} />
        <OptionPageSize limit={LIMIT} />
      </div>
    </>
  );
}
