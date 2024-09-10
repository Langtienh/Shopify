"use client";
import { Button } from "antd";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import RenderIf from "@/components/global/renderif";
import useAction from "@/hooks/useAction";
import { useAuth } from "@/contexts/auth.context";
import { useLoginModal } from "@/contexts/loginModal.context";
import { useWishList } from "@/contexts/wishLish.context";

export default function WishListButton({ productId }: { productId: number }) {
  const { user } = useAuth();
  const { wishList } = useWishList();
  const { showLoginModal } = useLoginModal();
  const isLoved = wishList.includes(productId);

  const { deleteWishList, createWishList } = useWishList();

  const [responseDel, isPendingDel, _delWishListItem] =
    useAction(deleteWishList);
  const [responseCreate, isPendingCreate, _createWishListItem] =
    useAction(createWishList);

  const isPending = isPendingDel || isPendingCreate;

  const path = usePathname();
  const onclick = async () => {
    if (!user) showLoginModal(path);
    else {
      if (isLoved) await _delWishListItem(productId);
      else await _createWishListItem(productId);
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
