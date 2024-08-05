"use client";
import Image from "next/image";
import httpCustom from "@/services/customAPI";
import { signOut } from "next-auth/react";
import { Tooltip } from "antd";

export const LogoutBtn = () => {
  const Logout = async () => {
    await httpCustom.get("/v1/logout");
    await signOut({ callbackUrl: "/login" });
  };
  return (
    <Tooltip title="Đăng suất" placement="bottom" color="red">
      <button
        onClick={Logout}
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
