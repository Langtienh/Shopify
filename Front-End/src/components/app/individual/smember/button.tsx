"use client";
import Image from "next/image";
import { Tooltip } from "antd";
import { useAuth } from "@/contexts/auth.context";
import { useState } from "react";
import { useCart } from "@/contexts/cart.context";

export const LogoutBtn = () => {
  const [isPending, setPending] = useState<boolean>(false);
  const { authLogout } = useAuth();
  const handleLogout = async () => {
    setPending(true);
    try {
      await authLogout();
    } finally {
      setPending(false);
    }
  };
  return (
    <Tooltip title="Đăng suất" placement="bottom" color="red">
      <button
        onClick={handleLogout}
        className=" px-[10px] py-2 flex gap-4  rounded-xl #ffeeee text-gray-600"
      >
        <Image
          width={18}
          height={18}
          alt="logout button"
          src="/images/smember/logout.svg"
        />
        <span className="hidden lg:inline-block">Thoát tài khoản</span>
      </button>
    </Tooltip>
  );
};
