"use client";
import RenderIf from "@/components/global/renderif";
import { useAuth } from "@/contexts/auth.context";
import { useCart } from "@/contexts/cart.context";
import { useLoginModal } from "@/contexts/loginModal.context";
import { Badge } from "antd";
import Image from "next/image";
import Link from "next/link";

export const Cart = () => {
  const { showLoginModal } = useLoginModal();
  const { user } = useAuth();
  const { itemsInCart } = useCart();
  return (
    <>
      <RenderIf renderIf={user}>
        <Link href="/cart">
          <div className="flex flex-col md:flex-row gap-1 items-center text-white">
            <Badge
              offset={[-13, 15]}
              size="small"
              count={
                <span className="text-white text-sm font-bold">
                  {itemsInCart}
                </span>
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
      <RenderIf renderIf={!user}>
        <div
          onClick={() => showLoginModal("/cart")}
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
