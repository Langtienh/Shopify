"use server";

import { cookies } from "next/headers";
import { get, post, put } from "../axios.helper";
import { signOut } from "@/auth/auth";
import { checkToken } from "../cookies";
import { getConfigToken } from "../cookies";

const EXP_REFRESH_TOKEN = +process.env.REFRESH_TOKEN! || 604800;
const EXP_TOKEN = +process.env.TOKEN! || 36000;

export const login = async (input: LoginDTO) => {
  try {
    const res = await post<LoginResponse | null>("/users/login", input);
    return res;
  } catch {
    return null;
  }
};

export const checkAccount = async (id: string) => {
  try {
    const res = await get<LoginResponse | null>(
      `/users/login-with-google/${id}`
    );
    return res.data;
  } catch {
    return null;
  }
};

export const firstLoginByprovider = async (input: FirstLoginDTO) => {
  const res = await post<LoginResponse>("/users/login-with-google", input);
  const data = res.data;
  const dataCustom = {
    user: data.user,
    refreshToken: data.refreshToken,
    token: data.token,
  };
  cookies().set({
    name: "REFRESH_TOKEN",
    value: dataCustom.refreshToken,
    maxAge: EXP_REFRESH_TOKEN,
    secure: true,
    httpOnly: true,
    path: "/",
  });
  cookies().set({
    name: "TOKEN",
    value: dataCustom.token,
    maxAge: EXP_TOKEN,
    secure: true,
    httpOnly: true,
    path: "/",
  });
  return {
    ...res,
    data: dataCustom,
  };
};

export const logout = async () => {
  await checkToken();
  const token = cookies().get("TOKEN")?.value;
  cookies().delete("TOKEN");
  cookies().delete("REFRESH_TOKEN");
  await post(`/users/logout`, {
    token,
  });
  await signOut({ redirectTo: "/login" });
};

export const register = async (input: RegisterForm) => {
  const res = await post("/users/register", input);
  return res;
};

// handle resetPassword

export const verifyMail = async (mail: string) => {
  const res = await post(`/users/verify-mail/${mail}`);
  return res;
};
type VerifyOTP = {
  userId: string;
  otpToken: string;
};
export const verifyOTP = async (mail: string, OTP: string) => {
  const res = await post<VerifyOTP>(`/users/verify-otp/${OTP}/${mail}`);
  cookies().set("otpToken", res.data.otpToken);
  cookies().set("userId", res.data.userId);
  return res;
};

export const resetPassword = async (newPassword: string) => {
  const otpToken = cookies().get("otpToken")?.value;
  const userId = cookies().get("userId")?.value;

  const res = await put(`/users/reset-password/${userId}`, {
    otpToken,
    newPassword,
  });
  cookies().delete("otpToken");
  cookies().delete("userId");
  return res;
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const { userId, configToken } = await getConfigToken();

  const res = await put(
    `users/change-password/${userId}`,
    { oldPassword, newPassword },
    configToken
  );
  return res;
};
