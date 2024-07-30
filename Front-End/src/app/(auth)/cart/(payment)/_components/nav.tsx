"use client";

import BackBtn from "@/app/(auth)/_components/btn.back";
import { Button } from "@/components/ui/button";
import { converPriceToVN } from "@/lib/ultils";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavPayment() {
  const path = usePathname();
  const step1 = path === "/cart/payment-info";
  const userInfo = !useAppSelector((state) => state.cart.paymentInfo?.address);
  return (
    <>
      <div className="flex w-full gap-5 *:flex-1 mb-[10px] p-[10px] pt-[5px] sticky z-10 top-0 bg-[#f4f6f8]">
        <Button
          className={`hover:no-underline border-b-[3px] rounded-none text-lg font-bold ${
            step1 ? "text-red-600 border-red-600" : "border-[#a9b4be]"
          }`}
          variant="link"
        >
          <Link href="/cart/payment-info">1. Thông tin</Link>
        </Button>
        <Button
          disabled={userInfo}
          className={`hover:no-underline border-b-[3px] rounded-none text-lg font-bold ${
            !step1 ? "text-red-600 border-red-600" : "border-[#a9b4be]"
          }`}
          variant="link"
        >
          <Link href="/cart/payment">2. Thanh toán</Link>
        </Button>
      </div>
    </>
  );
}

export const NavHeader = () => {
  const path = usePathname();
  const step1 = path === "/cart/payment-info";
  return (
    <div className="flex p-[10px] border-b">
      <BackBtn />
      <h2 className="text-lg text-center font-bold flex-1">
        {step1 ? "Thông tin" : "Thanh toán"}
      </h2>
    </div>
  );
};

export const NavSubmit = () => {
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const path = usePathname();
  const step1 = path === "/cart/payment-info";
  return (
    <div className="fixed bottom-0 bg-white border shadow-lg rounded-t-lg p-[10px] pb-5 w-full max-w-[600px]">
      <div className="flex items-center justify-between font-bold">
        <span>Tổng tiền tạm tính</span>
        <span className="text-red-600">{converPriceToVN(totalPrice, "đ")}</span>
      </div>
      {step1 && (
        <p className="mt-1 text-sm text-gray-400">
          Chưa gồm chiết khấu SMember
        </p>
      )}
      <Button className="mt-1 w-full bg-red-600 hover:bg-red-500 text-base p-0">
        <label
          className="w-full h-full flex items-center justify-center cursor-pointer"
          htmlFor="submitPaymentInfo"
        >
          {step1 ? "Tiếp tục" : "Thanh toán"}
        </label>
      </Button>
    </div>
  );
};
