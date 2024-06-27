"use client";
import React from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const Notification: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };
  openNotificationWithIcon(
    "success",
    "Thêm vào giỏ hàng thành công",
    "Thêm vào giỏ hàng thành công"
  );
  return <>{contextHolder}</>;
};

export default Notification;
