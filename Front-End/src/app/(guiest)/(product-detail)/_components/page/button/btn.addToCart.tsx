"use client";

type TSizes = "small" | "none" | "large";

import { Button } from "antd";
import { FaCartPlus } from "react-icons/fa";
import { openNotification } from "@/lib/nofication";
import { useAddCartItemMutation } from "@/redux/cart/services";
export default function AddProductToCart({
  productId,
  size = "large",
}: {
  productId: number;
  size?: TSizes;
}) {
  const [addCartItem, addCartItemResult] = useAddCartItemMutation();

  const onClick = () => {
    addCartItem({ productId, quantity: 1 });
    openNotification({
      message: "Thêm vào giỏ hàng thành công",
      description: "Thanh toán ngay để nhận ưu đãi",
      notificationType: "success",
    });
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
