"use client";
import RenderIf from "@/components/global/renderif";
import { useAuth } from "@/contexts/auth.context";
import { useLoginModal } from "@/contexts/loginModal.context";
import Link from "next/link";
import { CiDeliveryTruck } from "react-icons/ci";

export const InvoiceIcon = () => {
  const { showLoginModal } = useLoginModal();
  const { user } = useAuth();
  return (
    <>
      <RenderIf renderIf={user}>
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
      <RenderIf renderIf={!user}>
        <div
          onClick={() => showLoginModal("/smember/order")}
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
