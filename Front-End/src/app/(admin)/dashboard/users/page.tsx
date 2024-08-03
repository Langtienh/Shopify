import { fetchUser } from "@/actions/admin.services";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddUser, ChangePassword, DelUser, EditUser } from "./button";
import MyPagination from "@/components/pagination/pagination";
import { Input } from "antd";
import { IoSearch } from "react-icons/io5";
import { OptionPageSize } from "../../_ui/pagination";
import { FaUser } from "react-icons/fa";
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
  const data = await fetchUser(LIMIT, PAGE);
  const users = data.result;
  return (
    <>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-t rounded-t-xl">
        <div className="flex">
          <FaUser size={30} />
          <span className="pl-3 text-xl font-bold">Users Table</span>
        </div>
        <div className="basis-[400px] ml-auto flex gap-4">
          <div className="flex-1"></div>
          <Input placeholder="Search" allowClear prefix={<IoSearch />} />
          <AddUser />
        </div>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="*:font-bold">
            <TableHead className="w-[100px]">User</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>SĐT</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mã vùng</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead className="w-[200px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold">{user.id}</TableCell>
              <TableCell className="font-bold capitalize">
                {user.fullName}
              </TableCell>
              <TableCell className="textce">{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.roles.toString()}</TableCell>
              <TableCell className="flex gap-3 justify-center">
                <EditUser user={user} />
                <DelUser user={user} />
                <ChangePassword user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-b rounded-b-xl shadow-xl">
        <MyPagination pageSize={LIMIT} current={PAGE} total={data.totalItem} />
        <OptionPageSize limit={LIMIT} />
      </div>
    </>
  );
}
