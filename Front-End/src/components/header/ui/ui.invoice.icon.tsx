"use client";
import { showLoginModal } from "@/redux/login/slice";
import { useAppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CiDeliveryTruck } from "react-icons/ci";

export const InvoiceIcon = () => {
  const session = useSession();
  const isLogin = !!session.data?.user;
  const dispatch = useAppDispatch();
  const onclick = () => dispatch(showLoginModal("/smember/invoice"));
  if (isLogin) return <IsLogin />;
  return (
    <div onClick={onclick} className="flex gap-1 cursor-pointer">
      <CiDeliveryTruck size={34} />
      <p className="text-[12px]">
        Tra cứu <br />
        Đơn hàng
      </p>
    </div>
  );
};

const IsLogin = () => (
  <Link href={"/smember/invoice"} className="flex gap-1 cursor-pointer">
    <CiDeliveryTruck size={34} />
    <p className="text-[12px]">
      Tra cứu <br />
      Đơn hàng
    </p>
  </Link>
);
