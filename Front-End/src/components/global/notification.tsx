"use client";
import React from "react";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

export type NotificationType = {
  message: string;
  description: string;
  notificationType: "success" | "info" | "warning" | "error";
  placement?: NotificationPlacement;
  showProgress?: boolean;
  duration?: number;
};
export type NotificationProps = {
  button: React.JSX.Element;
  onClick: () => NotificationType;
};
const Notification = (props: NotificationProps) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = ({
    notificationType,
    message,
    description,
    showProgress = true,
    duration = 3,
    placement = "topRight",
  }: NotificationType) => {
    api[notificationType]({
      message,
      description,
      showProgress,
      duration,
      placement,
    });
  };
  const handleClick = () => {
    openNotification(props.onClick());
  };
  return (
    <>
      {contextHolder}
      <span onClick={handleClick}>{props.button}</span>
    </>
  );
};

export default Notification;
