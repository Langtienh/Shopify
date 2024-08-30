import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllComments } from "@/services/comment";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { DeleteCommentButton } from "./button";
import MyPagination, { OptionPageSize } from "@/components/global/pagination";

type Props = {
  page?: number;
  limit?: number;
};

export default async function TableComments({ limit, page }: Props) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const _page = page || 1;
  const _limit = limit || 10;
  const { comments, totalItem } = await getAllComments(_page, _limit);
  return (
    <>
      <Table>
        <TableCaption>A list of your recent comments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>ProductId</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-center">Rate</TableHead>
            <TableHead className="text-center">Create at</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={`comment${comment.id}`}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>
                      <Image
                        src="/images/default/avatar.jpg"
                        alt={`${comment.user.fullName}'s profile picture`}
                        className="rounded-full"
                        width={32}
                        height={32}
                      />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="truncate text-sm font-semibold md:text-base flex gap-2">
                      <span>{comment.user.fullName}</span>
                      {comment.purchased && (
                        <span className="text-[12px] font-normal flex gap-1 items-center">
                          <span>
                            <FaCheckCircle className="text-green-500" />
                          </span>
                          <span>Đã mua hàng</span>
                        </span>
                      )}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {comment.user.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Link
                  className="hover:text-blue-500 hover:underline"
                  href={`/dashboard/products/${comment.product.id}/edit`}
                >{`P0${comment.product.id}`}</Link>
              </TableCell>
              <TableCell className="w-[340px] text-wrap">
                {comment.content}
              </TableCell>
              <TableCell className="flex items-center justify-center gap-1">
                <span>{comment.rate}</span>
                <span>
                  <FaStar className="size-[14px] text-yellow-500" />
                </span>
              </TableCell>
              <TableCell className="text-center">{formattedDate}</TableCell>
              <TableCell className="text-center">
                <DeleteCommentButton commentId={comment.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="flex justify-start">
                <MyPagination
                  pageSize={_limit}
                  current={_page}
                  total={totalItem}
                />
              </div>
            </TableCell>
            <TableCell colSpan={2}>
              <OptionPageSize limit={_limit} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
