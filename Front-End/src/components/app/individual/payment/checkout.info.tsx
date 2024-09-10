"use client";

import { Button } from "@/components/ui/button";
import { Checkbox, Form, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { AddressInfo } from "./info";
import { getAddressDetail } from "@/services/address.helper";
import { createInvoice, createInvoiceByVNPay } from "@/services/invoice";
import useAction from "@/hooks/useAction";
import { useCart } from "@/contexts/cart.context";
import { useCheckout } from "@/contexts/checkout.context";

export default function CheckoutInfo({
  checkout,
  totalPrice,
}: {
  checkout: string;
  totalPrice: number;
}) {
  const cartItemIds = checkout.split(",").map((item) => +item);
  const router = useRouter();
  const { userInfo } = useCheckout();
  const [path, setPath] = useState<string>("");
  const [response, isPending, _createInvoice] = useAction(createInvoice);
  useEffect(() => {
    const getPath = async () => {
      if (userInfo) {
        const path = await getAddressDetail(userInfo.address);
        setPath(path);
      }
    };
    getPath();
  }, [userInfo]);

  const { triggerUpdateCart } = useCart();

  const onFinish = async () => {
    if (paymentId === 0) message.error("Vui lòng chọn phương thức thanh toán");
    else if (paymentId === 1) {
      const data = { ...userInfo, paymentMethodId: 1, cartItemIds };
      const res = await createInvoiceByVNPay(data, totalPrice);
      router.push(res);
    } else if (paymentId === 2) {
      const data = { ...userInfo, paymentMethodId: 2, cartItemIds };
      const res = await _createInvoice(data);
      if (res) {
        await triggerUpdateCart();
        router.push("/");
      }
    } else message.error("Đã xảy ra lỗi, vui lòng thử lại sau");
  };
  const [paymentId, setPaymentId] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <p className="uppercase mb-[10px]">Thông tin thanh toán</p>
      <div className="p-4 border rounded-lg shadow-md bg-white mb-7">
        <div
          onClick={() => setShow(true)}
          className="flex items-center cursor-pointer"
        >
          <Image
            src={paymentMethods[paymentId].image}
            alt={paymentMethods[paymentId].image}
            width={50}
            height={50}
            className="basis-[50px] h-[50px] w-[50px] object-contain"
          />
          <span className="ml-5 font-bold text-sm">
            {paymentMethods[paymentId].label}
          </span>
          <MdNavigateNext className="text-red-600 ml-auto" size={30} />
        </div>
        {/* modal */}
        {show && (
          <div className="fixed z-50 top-0 left-0 w-screen h-screen">
            <div
              onClick={() => setShow(false)}
              className="absolute z-50 top-0 left-0 w-screen h-screen bg-black opacity-50"
            ></div>
            <div className="absolute z-[51] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] min-h-[500px] bg-white shadow-lg border rounded-xl overflow-hidden">
              <div className="bg-gray-100 py-4 px-2 flex items-center justify-between">
                <span className="font-bold">Chọn phương thức thanh toán</span>
                <IoClose
                  className="cursor-pointer"
                  onClick={() => setShow(false)}
                  size={20}
                />
              </div>
              <div className="flex flex-col gap-[10px] py-4 px-2">
                <p className="font-bold">Khả dụng</p>
                {paymentMethods
                  .filter((item) => item.id > 0)
                  .map((item) => (
                    <div
                      onClick={() => {
                        setPaymentId(item.id);
                        setShow(false);
                      }}
                      key={item.id}
                      className="py-2 px-4 border rounded-xl flex items-center cursor-pointer"
                    >
                      <Image
                        src={item.image}
                        width={50}
                        height={50}
                        alt={item.image}
                        className="basis-[50px] h-[50px] w-[50px] object-contain"
                      />
                      <span className="font-bold text-sm pl-3">
                        {item.label}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t shadow-lg bg-gray-50">
                <Button
                  onClick={() => setShow(false)}
                  className="bg-red-600 hover:bg-red-500 w-full text-base py-2"
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <AddressInfo info={{ ...userInfo, address: path }} />
      <Form scrollToFirstError onFinish={onFinish}>
        <button
          id="submitPaymentInfo"
          type="submit"
          className="w-full hidden"
        />
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Vui lòng đọc và chấp nhận điều khoản")
                    ),
            },
          ]}
        >
          <Checkbox>
            <span className="text-base">
              Bằng việc Đặt hàng, bạn đồng ý với
              <span className="text-blue-500 font-bold hover:underline px-1">
                Điều khoản sử dụng
              </span>
              của Shopify
            </span>
          </Checkbox>
        </Form.Item>
      </Form>
    </>
  );
}

const paymentMethods = [
  {
    id: 0,
    image: "/images/payment/payment-methods.svg",
    label: "Chọn phương thức thanh toán",
  },
  {
    id: 1,
    image: "https://cdn2.cellphones.com.vn/x/media/logo/gw2/vnpay.png",
    label: (
      <>
        VNPAY (Demo){" "}
        <Link
          className="text-blue-600 hover:text-blue-500 hover:underline"
          target="_blank"
          passHref
          href="https://sandbox.vnpayment.vn/apis/vnpay-demo/"
        >
          Xem tài khoản demo
        </Link>
      </>
    ),
  },
  {
    id: 2,
    image:
      "https://cdn2.cellphones.com.vn/x400,webp,q100/media/payment-logo/COD.png",
    label: "Thanh toán khi nhận hàng",
  },
];
