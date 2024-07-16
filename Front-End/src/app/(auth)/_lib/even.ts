import { openNotification } from "@/lib/nofication";
import { signIn } from "next-auth/react";
import { firstLogin, loginAction } from "@/app/(auth)/_lib/actions";
import { DELAY } from "@/lib/ultils";

export const loginWithCredentials = async (
  values: LoginDTO,
  callbackUrl: string
) => {
  try {
    const res = await loginAction(values);
    if (res.status === 200) {
      const data = res.data;
      const customCredentials = {
        id: data?.user.id,
        fullName: data?.user.fullName,
        phone: data?.user.phone,
        email: data?.user.email,
        address: data?.user.address,
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
      await DELAY(2000);
    } else {
      openNotification({
        description: res?.message ?? "Vui lòng đăng nhập lại",
        message: "Đăng nhập thất bại",
        notificationType: "error",
      });
    }
  } catch {}
};

export const addPhone = async (input: FirstLoginDTO) => {
  const res = await firstLogin(input);
  if (res.status === 200) {
    openNotification({
      message: res.message || "Cập nhật thành công",
      description: "Vui lòng đợi trong giây lát",
      notificationType: "success",
    });
    await DELAY(2000);
    return res.data;
  } else {
    openNotification({
      description: res?.message ?? "Vui lòng thử lại",
      message: "Cập nhật thất bại",
      notificationType: "error",
    });
    return null;
  }
};
