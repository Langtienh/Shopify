"use client";
import { useGetCartQuery } from "@/redux/cart/services";
import { showLoginModal } from "@/redux/login/slice";
import { useAppDispatch } from "@/redux/store";
import { Badge } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Cart = () => {
  const session = useSession();
  const user = session.data?.user;
  if (user) return <IsLogin />;
  return <CartIcon />;
};

const IsLogin = () => {
  const { data } = useGetCartQuery();
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    if (data?.totalQuantity) setCounter(data.totalQuantity);
    else setCounter(0);
  }, [data]);
  return (
    <Link href="/cart">
      <div className="flex flex-col md:flex-row gap-1 items-center text-white">
        <Badge
          offset={[-13, 15]}
          size="small"
          count={
            <span className="text-white text-sm font-bold">{counter}</span>
          }
        >
          <Image
            width={27}
            height={27}
            src="/images/header/header2-cart.svg"
            alt="cart-icon"
          />
        </Badge>
        <div className="text-[12px] hidden md:block">
          <p>Giỏ</p>
          <p>hàng</p>
        </div>
      </div>
    </Link>
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
      <Image
        width={27}
        height={27}
        src="/images/header/header2-cart.svg"
        alt="cart-icon"
      />
      <div className="text-[12px] hidden md:block">
        <p>Giỏ</p>
        <p>hàng</p>
      </div>
    </div>
  );
};
