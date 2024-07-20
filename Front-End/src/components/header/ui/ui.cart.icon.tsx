"use client";
import { useGetCartQuery } from "@/redux/cart/services";
import { showLoginModal } from "@/redux/login/slice";
import { useAppDispatch } from "@/redux/store";
import { Badge } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShopify } from "react-icons/fa";

export const Cart = () => {
  const session = useSession();
  const user = session.data?.user;
  if (user) return <IsLogin />;
  return <CartIcon />;
};

const IsLogin = () => {
  const { data } = useGetCartQuery();
  const counter = data
    ? data.reduce((total, item) => {
        return total + item.quantity;
      }, 0)
    : 0;
  return (
    <Badge count={counter}>
      <Link href="/cart">
        <div className="flex flex-col md:flex-row gap-1 items-center text-white">
          <FaShopify size={30} />
          <div className="text-[12px] hidden md:block">
            <p>Giỏ</p>
            <p>hàng</p>
          </div>
        </div>
      </Link>
    </Badge>
  );
};
const CartIcon = () => {
  const dispatch = useAppDispatch();
  const onclick = () => dispatch(showLoginModal("/cart"));
  return (
    <div
      onClick={onclick}
      className="flex cursor-pointer flex-col md:flex-row gap-1 items-center text-white"
    >
      <FaShopify size={30} />
      <div className="text-[12px] hidden md:block">
        <p>Giỏ</p>
        <p>hàng</p>
      </div>
    </div>
  );
};
