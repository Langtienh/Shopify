import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { converPriceToVN } from "@/lib/ultils";

export default function Detail({
  orderDetail,
  amount,
}: {
  orderDetail: OrderDetailType[];
  amount: number;
}) {
  return (
    <>
      <div className="max-w-[800px] pt-5">
        <h2 className="mb-3 font-bold text-xl">Chi tiết</h2>
        <ul className="bg-white rounded-xl shadow-xl p-3">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50">
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead className="text-center">Giá</TableHead>
                <TableHead className="text-center">Giảm giá</TableHead>
                <TableHead className="text-center">Số lương</TableHead>
                <TableHead className="text-right font-bold">
                  Thành tiền
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetail.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{`PRO0${product.id}`}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-center">
                    {converPriceToVN(product.price, "đ")}
                  </TableCell>
                  <TableCell className="text-center">
                    {product.discount}%
                  </TableCell>
                  <TableCell className="text-center">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {converPriceToVN(
                      ((product.price * (100 - product.discount)) / 100) *
                        product.quantity,
                      "đ"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} className="font-bold">
                  Tổng tiền
                </TableCell>
                <TableCell className="text-right font-bold text-green-500">
                  {converPriceToVN(amount, "đ")}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ul>
      </div>
    </>
  );
}
