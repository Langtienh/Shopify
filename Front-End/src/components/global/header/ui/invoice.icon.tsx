"use client";
import RenderIf from "@/components/global/renderif";
import { showLoginModal } from "@/redux/login-modal/slice";
import { useAppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CiDeliveryTruck } from "react-icons/ci";

export const InvoiceIcon = () => {
  const session = useSession().data;
  const isLogin = session?.user && session.refreshToken;
  const dispatch = useAppDispatch();
  return (
    <>
      <RenderIf renderIf={isLogin}>
        <Link
          href={"/smember/order"}
          className="hidden md:flex gap-1 cursor-pointer"
        >
          <CiDeliveryTruck size={34} />
          <p className="text-[12px]">
            Tra cứu <br />
            Đơn hàng
          </p>
        </Link>
      </RenderIf>
      <RenderIf renderIf={!isLogin}>
        <div
          onClick={() => dispatch(showLoginModal("/smember/order"))}
          className="hidden md:flex gap-1 cursor-pointer"
        >
          <CiDeliveryTruck size={34} />
          <p className="text-[12px]">
            Tra cứu <br />
            Đơn hàng
          </p>
        </div>
      </RenderIf>
    </>
  );
};
