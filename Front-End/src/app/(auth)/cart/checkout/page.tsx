import Header2 from "@/components/header/header2";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  AddressInfo,
  CartInfo,
  OrderInfo,
} from "../(payment)/_components/info";
import { getOrderById, getOrderDetailById } from "@/actions/product.services";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { vnp_ResponseCode: string; orderId: string };
}) {
  const order = await getOrderById(searchParams.orderId);
  const orderDetails = await getOrderDetailById(searchParams.orderId);
  const isSucsess = searchParams.vnp_ResponseCode === "00";
  return (
    <>
      <Header2 />
      <div className="bg-[#f4f6f8] pb-[100px]">
        <div className="w-full max-w-[600px] mx-auto relative">
          <h2 className="text-center p-[10px] text-lg font-bold border-b">
            Hoàn tất đơn hàng
          </h2>
          {isSucsess ? <Sucsess /> : <Error />}
          <OrderInfo info={{ ...order, quantity: orderDetails.length }} />
          <AddressInfo info={order} />
          <CartInfo cart={orderDetails} />
          <div className="fixed bottom-0 px-[10px] pt-4 pb-5 w-full max-w-[600px] grid grid-cols-2 gap-2 bg-white rounded-t-xl shadow-lg">
            <Link className="w-full" href="/">
              <Button
                className="text-base w-full text-red-600 border-red-600 hover:border-red-500 hover:bg-white border-2"
                variant="outline"
              >
                Xem sản phẩm khác
              </Button>
            </Link>
            <Link className="w-full" href="/">
              <Button className="text-base w-full bg-red-600 hover:bg-red-500">
                Mua lại
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const Error = () => (
  <div className="bg-[#f5e1e2] p-[10px] my-5 rounded-xl flex items-center justify-between h-[95px]">
    <div className="basis-[90px] flex-shrink-0 ml-5 w-full relative">
      <Image
        className="absolute top-1/2 -translate-y-1/2"
        src="/images/payment/cart-error.e04728c.svg"
        alt="cart-error.e04728c.svg"
        width={90}
        height={135}
      />
    </div>
    <div className="flex-1">
      <p className="text-red-600 text-xl text-center">
        Đặt hàng không thành công
      </p>
      <p className="text-center text-sm text-gray-500 pt-1">
        Vui lòng kiểm tra lại thông tin đặt hàng & thanh toán
      </p>
    </div>
  </div>
);
const Sucsess = () => (
  <div className="bg-[#f5e1e2] p-[10px] my-5 rounded-xl flex items-center justify-between h-[95px]">
    <div className="basis-[90px] flex-shrink-0 ml-5 w-full relative">
      <Image
        className="absolute top-1/2 -translate-y-1/2"
        src="/images/payment/Shipper2.webp"
        alt="Shipper2.webp"
        width={90}
        height={135}
      />
    </div>
    <div className="flex-1">
      <p className="text-red-600 text-xl text-center">
        Shopify xin cảm ơn quý khách
      </p>
      <p className="text-center text-sm text-gray-500 pt-1">
        Đơn hàng của bạn sẽ được giao trong vòng 2h tới <br /> Chi tiết đơn hàng
        sẽ được gửi đến gmail của bạn
      </p>
    </div>
  </div>
);
