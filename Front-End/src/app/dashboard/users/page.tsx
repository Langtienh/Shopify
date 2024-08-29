import { getUser } from "@/services/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AddUser,
  LockUser,
  EditUser,
} from "@/components/app/dashboard/users/button";
import MyPagination, { OptionPageSize } from "@/components/global/pagination";
import { Badge } from "antd";
import { FaUser } from "react-icons/fa";
import getAuthCache from "@/auth/getSesstion";
import Search from "@/components/app/dashboard/users/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
type PropsType = {
  searchParams: {
    page?: number;
    limit?: number;
    name?: string;
  };
};
export default async function Page({
  searchParams: { page, limit, name },
}: PropsType) {
  const PAGE = page || 1;
  const LIMIT = limit || 10;
  const data = await getUser(LIMIT, PAGE, name);
  const users = data.result;
  const auth = await getAuthCache();
  const isDemo = auth?.user?.roles?.includes("demo");
  return (
    <>
      <div className="bg-white py-3 border-y flex justify-between items-center px-3 border-t rounded-t-xl">
        <div className="flex">
          <FaUser size={30} />
          <span className="pl-3 text-xl font-bold">Users Table</span>
        </div>
        <div className="basis-[400px] ml-auto flex gap-4">
          <div className="flex-1"></div>
          <Search />
          <AddUser />
        </div>
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="*:font-bold hover:bg-gray-50">
            <TableHead>Id</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>SĐT</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead>Mã vùng</TableHead> */}
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold">{`U0${user.id}`}</TableCell>
              <TableCell className="font-bold capitalize">
                <div className="flex items-center">
                  <Avatar className="mr-3 size-8">
                    <AvatarImage alt={user.fullName} src={user.avatar} />
                    <AvatarFallback>
                      <Image
                        src="/images/default/avatar.jpg"
                        alt={`${user.fullName}'s profile picture`}
                        className="rounded-full"
                        width={24}
                        height={24}
                      />
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.fullName}</span>
                </div>
              </TableCell>
              <TableCell className="textce">{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              {/* <TableCell>{user.address}</TableCell> */}
              <TableCell>{user.roles.toString()}</TableCell>
              <TableCell>
                {user.active ? (
                  <Badge status="success" text="Hoạt động" />
                ) : (
                  <Badge status="error" text="Khóa" />
                )}
              </TableCell>
              <TableCell className="flex h-full items-center gap-4 px-4">
                <EditUser userId={user.id} />
                <LockUser isDemo={isDemo} user={user} />
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
