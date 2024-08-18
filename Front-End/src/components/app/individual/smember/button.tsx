"use client";
import Image from "next/image";
import { Tooltip } from "antd";
import { logout } from "@/services/auth";
import { useAppDispatch } from "@/redux/store";
import { setTotalQuantity } from "@/redux/cart/slice";
import { setWishList } from "@/redux/wish-list/slice";

export const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(setTotalQuantity(0));
    dispatch(setWishList([]));
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
