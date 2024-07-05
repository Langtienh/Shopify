"use client";

import { Button } from "antd";
import { FaCartPlus } from "react-icons/fa";
import Notification from "@/components/global/notification";
import { NotificationType } from "@/components/global/notification";
export const AddProductToCart = ({ productId }: { productId: number }) => {
  const onClick = (): NotificationType => {
    console.log(productId);
    return {
      message: "Thêm vào giỏ hàng thành công",
      description: "Thanh toán ngay để nhận ưu đãi",
      notificationType: "success",
      duration: 1,
    };
  };
  return (
    <>
      <Notification
        onClick={onClick}
        button={<Button danger icon={<FaCartPlus />} />}
      />
    </>
  );
};
