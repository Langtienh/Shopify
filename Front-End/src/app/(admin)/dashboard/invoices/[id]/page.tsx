import { getInvoiceDetailById } from "@/services/invoice";
import UseInfo from "./user.info";
import Detail from "./invoice.detail";

export default async function Page({
  params,
}: {
  params: { id: string | number };
}) {
  const { order, orderDetail } = await getInvoiceDetailById(params.id);
  return (
    <>
      <UseInfo order={order} />
      <Detail orderDetail={orderDetail} amount={order.totalPrice} />
    </>
  );
}
