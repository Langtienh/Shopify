import { openNotification } from "@/lib/nofication";
import { signIn } from "next-auth/react";
import { login } from "@/services/auth";
import { message } from "antd";

export const loginWithCredentials = async (
  values: LoginDTO,
  callbackUrl: string
) => {
  try {
    const res = await login(values);
    if (res.status === 200) {
      const data = res.data;
      const customCredentials = {
        id: data?.user.id,
        fullName: data?.user.fullName,
        phone: data?.user.phone,
        email: data?.user.email,
        avatar: data?.user.avatar,
        active: data?.user.active,
        roles: data?.user.roles,
        refreshToken: data?.refreshToken,
        token: data?.token,
      };
      if (data)
        await signIn("credentials", { ...customCredentials, callbackUrl });
      openNotification({
        message: res.message || "Đăng nhập thành công",
        description: "Vui lòng đợi trong giây lát",
        notificationType: "success",
      });
    } else {
      openNotification({
        description: res?.message ?? "Vui lòng đăng nhập lại",
        message: "Đăng nhập thất bại",
        notificationType: "error",
      });
    }
  } catch {}
};
