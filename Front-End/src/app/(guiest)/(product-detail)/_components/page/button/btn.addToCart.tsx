"use client";

type TSizes = "small" | "none" | "large";

import { Button } from "antd";
import { FaCartPlus } from "react-icons/fa";
import { openNotification } from "@/lib/nofication";
import { useAddCartItemMutation } from "@/redux/cart/services";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/store";
import { showLoginModal } from "@/redux/login/slice";
export default function AddProductToCart({
  productId,
  size = "large",
}: {
  productId: number;
  size?: TSizes;
}) {
  const path = usePathname();
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;
  const [addCartItem] = useAddCartItemMutation();
  const dispatch = useAppDispatch();
  const onClick = () => {
    if (user) {
      addCartItem(productId);
      openNotification({
        message: "Thêm vào giỏ hàng thành công",
        description: "Thanh toán ngay để nhận ưu đãi",
        notificationType: "success",
      });
    } else dispatch(showLoginModal(path));
  };
  if (size === "large")
    return (
      <button
        onClick={onClick}
        className="h-full rounded-lg border-[2px] border-red-500"
      >
        <div className="flex flex-col items-center justify-center px-1 gap-1 text-red-500">
          <FaCartPlus size={25} />{" "}
          <p className="text-[7.5px] text-nowrap">Thêm vào giỏ hàng</p>
        </div>
      </button>
    );
  return <Button onClick={onClick} danger icon={<FaCartPlus />} />;
}
