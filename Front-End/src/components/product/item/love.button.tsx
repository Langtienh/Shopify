"use client";
import { Button } from "@/components/ui/button";
import {
  useDeleteLoveMutation,
  usePostLoveMutation,
} from "@/redux/love/services";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
export default function LoveButton({ productId }: { productId: number }) {
  const loveList = useAppSelector((state) => state.listLove.listLove);
  const [item, setItem] = useState<Love | undefined>(undefined);
  useEffect(() => {
    const _item = loveList.find((item) => item.productId === productId);
    if (_item) setItem(_item);
    else setItem(undefined);
  }, [loveList, productId]);
  const [PostAction, { isLoading }] = usePostLoveMutation();
  const [DeleteAction] = useDeleteLoveMutation();
  if (item)
    return (
      <Button
        size="icon"
        disabled={isLoading}
        variant="ghost"
        onClick={() => DeleteAction(item.id)}
      >
        <FaHeart className="text-red-500 hover:scale-[1.2] p-0" size={22} />
      </Button>
    );
  return (
    <Button
      disabled={isLoading}
      size="icon"
      variant="ghost"
      onClick={() => PostAction(productId)}
    >
      <FaRegHeart className="text-red-500 hover:scale-[1.2] p-0" size={22} />
    </Button>
  );
}
