"use client";
import RenderIf from "@/components/global/renderif";
import { showLoginModal } from "@/redux/login-modal/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Badge } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Cart = () => {
  const cartSize = useAppSelector((state) => state.cart.totalQuantity);
  const dispatch = useAppDispatch();
  const session = useSession().data;
  const isLogin = session?.user && session.refreshToken;
  return (
    <>
      <RenderIf renderIf={isLogin}>
        <Link href="/cart">
          <div className="flex flex-col md:flex-row gap-1 items-center text-white">
            <Badge
              offset={[-13, 15]}
              size="small"
              count={
                <span className="text-white text-sm font-bold">{cartSize}</span>
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
      </RenderIf>
      <RenderIf renderIf={!isLogin}>
        <div
          onClick={() => dispatch(showLoginModal("/cart"))}
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
      </RenderIf>
    </>
  );
};
