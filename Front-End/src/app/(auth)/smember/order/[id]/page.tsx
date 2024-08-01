import { getOrderById, getOrderDetailById } from "@/actions/product.services";
import BackBtn from "@/app/(auth)/_components/btn.back";
import { formatDate, priceThrough, productToSlug } from "@/lib/ultils";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: number } }) {
  const orderDetail = await getOrderDetailById(params.id);
  const order = await getOrderById(params.id);
  return (
    <div className="pb-[100px]">
      <div className="p-[10px] flex">
        <BackBtn />
        <p className="pl-4 text-2xl font-bold">Chi tiết đơn hàng</p>
      </div>
      <div className="flex items-center justify-between">
        <p>
          Mã đơn hàng:{" "}
          <span className="font-bold">{`SHOPIFY00${order.id}`}</span>
        </p>
        <span className="py-1 px-3 rounded-xl bg-gray-300 text-gray-500 text-[13px]">
          {order.orderStatus}
        </span>
      </div>
      <div className="text-gray-400 text-sm">{formatDate(order.orderDate)}</div>
      <ul className="mt-3 p-[10px] bg-white shadow-xl border rounded-xl">
        {orderDetail.map((item) => (
          <li
            key={item.name}
            className="flex gap-5 border-b last:border-none py-[10px]"
          >
            <Image
              alt={item.name}
              src={item.image}
              width={110}
              height={110}
              className="basis-[110px] flex-shrink-0"
            />
            <div className="flex flex-1 flex-col gap-2">
              <Link href={productToSlug(item.name, item.productId)}>
                {item.name}
              </Link>
              <p className="text-sm">
                Số lượng: <span className="text-red-600">{item.quantity}</span>
              </p>
              <div className="flex gap-4">
                <Link
                  className="px-3 py-1 text-[12px] text-red-600  border border-red-600 rounded-sm"
                  href={productToSlug(item.name, item.productId)}
                >
                  Đánh giá
                </Link>
                <Link
                  className="px-3 py-1 text-[12px] text-red-600  border border-red-600 rounded-sm"
                  href={productToSlug(item.name, item.productId)}
                >
                  Mua lại
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 p-[10px] bg-white shadow-xl border rounded-xl">
        <div className="flex gap-4 items-center mb-4">
          <Image
            src="/images/payment/payment-methods.svg"
            alt="payment-methods.svg"
            width={32}
            height={32}
            className="basis-[32px]"
          />
          <p className="text-lg font-bold">Thông tin thanh toán</p>
        </div>
        <ul className="flex flex-col gap-2 text-[15px]">
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Tổng tiền sản phẩm:</span>
            <span>{priceThrough(order.totalPrice)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Giảm giá:</span>
            <span>-3.000.000đ</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Phí vận chuyển:</span>
            <span>Miễn phí</span>
          </li>
          <hr className="w-full h-[1px] bg-gray-400" />
          <li className="flex items-center justify-between">
            <span className="text-gray-400">Phải thanh toán:</span>
            <span className="font-bold">
              {priceThrough(order.totalPrice - 3000000)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span>Còn phải thanh toán:</span>
            <span className="text-red-600 font-bold">
              {priceThrough(order.totalPrice - 3000000)}
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-3 p-[10px] bg-white shadow-xl border rounded-xl">
        <div className="flex gap-4 items-center mb-4">
          <Image
            src="/images/Shipper.png"
            alt="Shipper.png"
            width={32}
            height={32}
            className="basis-[32px]"
          />
          <p className="text-lg font-bold">Thông tin khách hàng</p>
        </div>
        <ul className="flex flex-col gap-2 text-[15px]">
          <li className="flex items-center gap-5">
            <Image
              width={24}
              height={24}
              alt="user"
              src="/images/order-detail/user.svg"
            />
            <span className="capitalize">{order.fullName}</span>
          </li>
          <li className="flex items-center gap-5">
            <Image
              width={24}
              height={24}
              alt="phone"
              src="/images/order-detail/phone.svg"
            />
            <span>{order.phone}</span>
          </li>
          <li className="flex items-center gap-5">
            <Image
              width={24}
              height={24}
              alt="address"
              src="/images/order-detail/map.svg"
            />
            <span>{order.address}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
