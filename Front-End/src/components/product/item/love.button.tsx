"use client";
import { Button } from "antd";
import {
  useDeleteLoveMutation,
  usePostLoveMutation,
} from "@/redux/love/services";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { showLoginModal } from "@/redux/login/slice";
import { usePathname } from "next/navigation";

export default function LoveButton({ productId }: { productId: number }) {
  const session = useSession();
  const user = session.data?.user;
  if (user) return <IsLogin productId={productId} />;
  return <OpenLoginModal />;
}
const IsLogin = ({ productId }: { productId: number }) => {
  const loveList = useAppSelector((state) => state.listLove.listLove);
  const [item, setItem] = useState<Love | undefined>(undefined);
  useEffect(() => {
    const _item = loveList.find((item) => item.productId === productId);
    if (_item) setItem(_item);
    else setItem(undefined);
  }, [loveList, productId]);
  if (item) return <Loved id={item.id} />;
  return <NoLove productId={productId} />;
};

const Loved = ({ id }: { id: number }) => {
  const [DeleteAction, { isLoading }] = useDeleteLoveMutation();

  return (
    <Button
      size="small"
      type="text"
      loading={isLoading}
      onClick={() => DeleteAction(id)}
      icon={
        <FaHeart className="text-red-500 hover:scale-[1.2] p-0" size={22} />
      }
    />
  );
};

const NoLove = ({ productId }: { productId: number }) => {
  const [PostAction, { isLoading, isSuccess }] = usePostLoveMutation();
  return (
    <Button
      loading={isLoading}
      size="small"
      type="text"
      onClick={() => PostAction(productId)}
      icon={
        <FaRegHeart className="text-red-500 hover:scale-[1.2] p-0" size={22} />
      }
    />
  );
};

const OpenLoginModal = () => {
  const dispatch = useAppDispatch();
  const onclick = () => dispatch(showLoginModal(path));
  const path = usePathname();
  return (
    <Button
      size="small"
      type="text"
      onClick={onclick}
      icon={
        <FaRegHeart className="text-red-500 hover:scale-[1.2] p-0" size={22} />
      }
    />
  );
};
