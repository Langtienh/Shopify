import { fetchInvoiceDetail } from "@/actions/admin.services";
import UseInfo from "./user.info";
import Detail from "./invoice.detail";

export default async function Page({
  params,
}: {
  params: { id: string | number };
}) {
  const { order, orderDetail } = await fetchInvoiceDetail(params.id);
  return (
    <>
      <UseInfo order={order} />
      <Detail orderDetail={orderDetail} amount={order.totalPrice} />
    </>
  );
}
