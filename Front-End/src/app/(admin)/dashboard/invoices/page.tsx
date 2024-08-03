import { fetchInvoice } from "@/actions/admin.services";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditStatus, View } from "./button";
import { OptionPageSize } from "../../_ui/pagination";
import MyPagination from "@/components/pagination/pagination";
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
  const LIMIT = limit || 5;
  const { invoices, totalItem } = await fetchInvoice(LIMIT, PAGE);
  return (
    <>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-t rounded-t-xl">
        <div className="flex">
          <MdLaptopChromebook size={30} />
          <span className="pl-3 text-xl font-bold">Invoices Table</span>
        </div>
        <div className="basis-[300px] ml-auto">
          <Input placeholder="Search" allowClear prefix={<IoSearch />} />
        </div>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="*:font-bold">
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="w-[300px] text-center">Status</TableHead>
            <TableHead className="w-[100px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-bold">{invoice.id}</TableCell>
              <TableCell className="font-bold text-green-500">
                {invoice.totalPrice}
              </TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="flex gap-3 items-center">
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
