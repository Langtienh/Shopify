import { openNotification } from "@/lib/nofication";
import { signIn } from "next-auth/react";

export const loginWithCredentials = async (values: LoginDTO) => {
  console.log("check");
  const res = await signIn("credentials", { ...values, redirect: false });
  if (res?.error) {
    openNotification({
      description: res?.error ?? "Vui lòng đăng nhập lại",
      message: "Đăng nhập thất bại",
      notificationType: "error",
    });
    return false;
  } else
    openNotification({
      message: "Đăng nhập thành công",
      description: "Vui lòng đợi trong giây lát",
      notificationType: "success",
    });
  return true;
};
