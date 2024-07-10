"use client";

import { Button } from "antd";
import { FaCartPlus } from "react-icons/fa";
import { openNotification } from "@/lib/nofication";
export const AddProductToCart = ({ productId }: { productId: number }) => {
  const onClick = () => {
    console.log(productId);
    openNotification({
      message: "Thêm vào giỏ hàng thành công",
      description: "Thanh toán ngay để nhận ưu đãi",
      notificationType: "success",
    });
  };
  return <Button onClick={onClick} danger icon={<FaCartPlus />} />;
};
