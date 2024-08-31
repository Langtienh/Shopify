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
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { RestoreProductButton } from "./button";
import MyPagination, { OptionPageSize } from "@/components/global/pagination";

type Props = {
  page?: number;
  limit?: number;
  products: Product[];
  totalItem: number;
};

export default async function TableProductDeleted({
  limit,
  page,
  products,
  totalItem,
}: Props) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const _page = page || 1;
  const _limit = limit || 10;
  return (
    <>
      <Table>
        <TableCaption>A list of your recent comments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ProductId</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Rate</TableHead>
            <TableHead className="text-center">Delete at</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={`product${product.id}`}>
              <TableCell className="text-center">
                <Link
                  className="hover:text-blue-500 hover:underline"
                  href={`/dashboard/products/${product.id}/edit`}
                >{`P0${product.id}`}</Link>
              </TableCell>
              <TableCell className="w-[340px] text-wrap">
                {product.name}
              </TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <span>{product.avgRate}</span>
                  <span>
                    <FaStar className="size-[14px] text-yellow-500" />
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">{formattedDate}</TableCell>
              <TableCell className="text-center">
                <RestoreProductButton productId={product.id} />
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
