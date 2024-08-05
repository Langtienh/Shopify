import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Record from "./record";

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow className="*:font-bold">
          <TableHead></TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Tên sản phẩm</TableHead>
          <TableHead className="text-center">Giá</TableHead>
          <TableHead className="text-center">Kho</TableHead>
          <TableHead className="text-center">Lượt xem</TableHead>
          <TableHead className="text-center">Đánh giá</TableHead>
          <TableHead className="w-[200px] text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <Record product={product} key={product.id} />
        ))}
      </TableBody>
    </Table>
  );
}
