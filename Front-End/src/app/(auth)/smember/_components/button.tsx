"use client";
import Image from "next/image";
import httpCustom from "@/actions/customAPI";
import { signOut } from "next-auth/react";

export const LogoutBtn = () => {
  const Logout = async () => {
    await httpCustom.get("/v1/logout");
    await signOut({ callbackUrl: "/login" });
  };
  return (
    <button
      onClick={Logout}
      className=" px-[10px] py-2 flex gap-4  rounded-xl border #ffeeee text-gray-600"
    >
      <Image
        width={18}
        height={18}
        alt="logout button"
        src="/images/smember/logout.svg"
      />
      <span>Thoát tài khoản</span>
    </button>
  );
};
