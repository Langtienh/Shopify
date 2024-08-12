import { priceShow, priceThrough } from "@/lib/utils2";
import Image from "next/image";
import { VoucherButton } from "./button";

export const OrderInfo = ({
  info,
}: {
  info: {
    id: string | number;
    quantity: number;
    totalPrice: number;
    paymentMethod: string;
  };
}) => {
  return (
    <>
      <p className="uppercase mb-[10px]">Thông tin nhận hàng</p>
      <div className="p-5 border rounded-lg shadow-md bg-white mb-7 flex flex-col gap-3 text-[15px]">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Mã đơn hàng</span>
          <span className="uppercase font-bold">{`SHOPIFY00${info.id}`}</span>
        </div>
        <hr className="w-full h-[1px] bg-gray-300" />
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Số lượng sản phẩm</span>
          <span className="uppercase font-bold">{info.quantity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Tổng tiền (đã bao gồm VAT)</span>
          <span className="font-bold">
            {info.totalPrice && priceThrough(info.totalPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Phương thức thanh toán</span>
          <span className="uppercase font-bold">{info.paymentMethod}</span>
        </div>
        <hr className="w-full h-[1px] bg-gray-300" />
        <div className="flex items-center justify-between">
          <span className="text-gray-400 font-bold">Cần thanh toán</span>
          <span className="text-red-600 font-bold">
            {info.totalPrice && priceThrough(info.totalPrice)}
          </span>
        </div>
      </div>
    </>
  );
};

type AddressInfoType = {
  fullName?: string | null;
  email?: string | null;
  phone?: string;
  address?: string;
};
export const AddressInfo = ({ info }: { info: AddressInfoType }) => {
  return (
    <>
      <p className="uppercase mb-[10px]">Thông tin nhận hàng</p>
      <ul className="p-4 border rounded-lg shadow-md bg-white mb-7 flex flex-col gap-3 text-[15px]">
        <li className="flex justify-between">
          <span className="text-gray-400 basis-[100px] flex-shrink-0">
            Khách hàng
          </span>
          <span className="capitalize">{info.fullName}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400 basis-[100px] flex-shrink-0">
            Số điện thoại
          </span>
          <span>{info.phone}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400 basis-[100px] flex-shrink-0">
            Email
          </span>
          <span>{info.email}</span>
        </li>
        <li className="flex justify-between gap-10">
          <span className="text-gray-400 basis-[100px] flex-shrink-0">
            Nhận hàng tại
          </span>
          <span className="text-end">{info.address}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400 basis-[100px] flex-shrink-0 ">
            Người nhận
          </span>
          <span className="capitalize">{`${info.fullName} - ${info.phone}`}</span>
        </li>
      </ul>
    </>
  );
};
export const CartInfo = ({
  cart,
}: {
  cart: OrderDetailType[] | CartItemType[];
}) => {
  return (
    <>
      <h2 className="uppercase mb-[10px]">Danh sách sản phẩm</h2>
      <ul className="p-[10px] border rounded-lg shadow-md bg-white mb-7">
        {cart.map((item) => (
          <li
            key={`cart-item${item.id}`}
            className="last:border-0 border-b py-3 flex gap-5"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="basis-[100px]"
            />
            <div className="flex-1">
              <p>{item.name}</p>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-baseline">
                  <p className="text-red-600 font-bold">
                    {priceShow(item.price, item.discount)}
                  </p>
                  <p className="text-sm line-through text-gray-400 pl-2">
                    {priceThrough(item.price)}
                  </p>
                </div>
                <p>
                  <span>Số lượng</span>
                  <span className="text-red-600 pl-1">{item.quantity}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export const CartCheckout = ({
  quantity,
  totalPrice,
}: {
  quantity: number;
  totalPrice: number;
}) => {
  return (
    <>
      <div className="p-4 border rounded-lg shadow-md bg-white mb-7">
        <div className="flex gap-5">
          <VoucherButton />
        </div>
        <ul className="py-4 flex flex-col gap-3 border-b">
          <li className="flex justify-between items-center">
            <span className="text-gray-400">Số lượng sản phẩm</span>
            <span>{quantity}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-400">Tiền hàng (tạm tính)</span>
            <span>{priceThrough(totalPrice)}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-400">Phí vận chuyển</span>
            <span>Miễn phí</span>
          </li>
        </ul>
        <div className="flex items-center justify-between pt-5">
          <div>
            <span className="font-bold pr-1">Tổng tiền</span>
            <span className="text-gray-400 ">(đã gồm VAT)</span>
          </div>
          <span className="font-bold">{priceThrough(totalPrice)}</span>
        </div>
      </div>
    </>
  );
};
