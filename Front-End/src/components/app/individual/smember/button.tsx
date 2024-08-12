"use client";
import Image from "next/image";
import { Tooltip } from "antd";
import { logout } from "@/services/auth";

export const LogoutBtn = () => {
  const handleLogout = async () => {
    await logout();
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
