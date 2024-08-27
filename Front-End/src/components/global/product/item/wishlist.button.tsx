"use client";
import { Button, message } from "antd";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import RenderIf from "@/components/global/renderif";
import { createWishListItem, delWishListItem } from "@/services/wish-list";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { showLoginModal } from "@/redux/login-modal/slice";
import { popWishListItem, pushWishListItem } from "@/redux/wish-list/slice";

export default function WishListButton({ productId }: { productId: number }) {
  const session = useSession().data;
  const isLogin = session?.user && session.refreshToken;
  const wishList = useAppSelector((state) => state.wishLish.data);

  const dispatch = useAppDispatch();
  const isLoved = wishList.includes(productId);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const path = usePathname();
  const onclick = async () => {
    if (!isLogin) dispatch(showLoginModal(path));
    else {
      setIsloading(true);
      if (isLoved) {
        const res = await delWishListItem(productId);
        if (res.isError) message.error(res.message);
        else {
          message.success(res.message);
          dispatch(popWishListItem(productId));
        }
      } else {
        const res = await createWishListItem(productId);
        if (res.isError) message.error(res.message);
        else {
          message.success(res.message);
          dispatch(pushWishListItem(productId));
        }
      }
      setIsloading(false);
    }
  };
  return (
    <Button
      size="small"
      type="text"
      loading={isLoading}
      onClick={onclick}
      icon={
        <>
          <RenderIf renderIf={isLoved}>
            <FaHeart className="text-red-500 hover:scale-[1.2] p-0" size={22} />
          </RenderIf>
          <RenderIf renderIf={!isLoved}>
            <FaRegHeart
              className="text-red-500 hover:scale-[1.2] p-0"
              size={22}
            />
          </RenderIf>
        </>
      }
    />
  );
}
