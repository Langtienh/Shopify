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

export const openNotification = ({
  notificationType,
  message,
  description,
  showProgress = true,
  duration = 2,
  placement = "topRight",
}: NotificationType) => {
  notification[notificationType]({
    message,
    description,
    showProgress,
    duration,
    placement,
  });
};
