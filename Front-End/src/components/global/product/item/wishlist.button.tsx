"use client";
import { Button } from "antd";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import RenderIf from "@/components/global/renderif";
import { createWishListItem, delWishListItem } from "@/services/wish-list";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { showLoginModal } from "@/redux/login-modal/slice";
import { popWishListItem, pushWishListItem } from "@/redux/wish-list/slice";
import useAction from "@/hooks/useAction";

export default function WishListButton({ productId }: { productId: number }) {
  const session = useSession().data;
  const isLogin = session?.user && session.refreshToken;
  const wishList = useAppSelector((state) => state.wishLish.data);

  const dispatch = useAppDispatch();
  const isLoved = wishList.includes(productId);
  const [responseDel, isPendingDel, _delWishListItem] =
    useAction(delWishListItem);
  const [responseCreate, isPendingCreate, _createWishListItem] =
    useAction(createWishListItem);
  const isPending = isPendingDel && isPendingCreate;
  const path = usePathname();
  const onclick = async () => {
    if (!isLogin) dispatch(showLoginModal(path));
    else {
      if (isLoved) {
        const res = await _delWishListItem(productId);
        if (res) dispatch(popWishListItem(productId));
      } else {
        const res = await _createWishListItem(productId);
        if (res) dispatch(pushWishListItem(productId));
      }
    }
  };
  return (
    <Button
      size="small"
      type="text"
      loading={isPending}
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
