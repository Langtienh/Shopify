"use server";

import { cookies } from "next/headers";
import { get, post, put } from "../axios.helper";
import { signOut } from "@/auth/auth";
import { checkToken } from "../cookies";
import { getConfigToken } from "../cookies";

export const login = async (input: LoginDTO) => {
  const res = await post<LoginResponse>("/users/login", input);
  const data = res.data;
  if (data) {
    const dataCustom = {
      user: data.user,
      refreshToken: data.refreshToken,
      token: data.token,
    };
    return {
      message: res.message,
      status: res.status,
      data: dataCustom,
    };
  }
  return { message: res.message, status: res.status };
};
export const loginByProvider = async () => {};

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
  try {
    const res = await post<LoginResponse>("/users/login-with-google", input);
    const data = res.data;
    const dataCustom = {
      user: data.user,
      refreshToken: data.refreshToken,
      token: data.token,
    };
    cookies().set("TOKEN", dataCustom.token);
    cookies().set("REFRESH_TOKEN", dataCustom.refreshToken);
    return {
      ...res,
      data: dataCustom,
    };
  } catch (error) {
    return error as ReqError;
  }
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
  try {
    const res = await post("/users/register", input);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const refreshToken = async () => {};

// handle resetPassword

export const verifyMail = async (mail: string) => {
  try {
    await post(`/users/verify-mail/${mail}`);
    return true;
  } catch {
    return false;
  }
};
type VerifyOTP = {
  userId: string;
  otpToken: string;
};
export const verifyOTP = async (mail: string, OTP: string) => {
  try {
    const res = await post<VerifyOTP>(`/users/verify-otp/${OTP}/${mail}`);
    cookies().set("otpToken", res.data.otpToken);
    cookies().set("userId", res.data.userId);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const resetPassword = async (newPassword: string) => {
  try {
    const otpToken = cookies().get("otpToken")?.value;
    const userId = cookies().get("userId")?.value;

    const res = await put(`/users/reset-password/${userId}`, {
      otpToken,
      newPassword,
    });
    cookies().delete("otpToken");
    cookies().delete("userId");
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    const { userId, configToken } = await getConfigToken();

    const res = await put(
      `users/change-password/${userId}`,
      { oldPassword, newPassword },
      configToken
    );
    return res;
  } catch (error) {
    return error as ReqError;
  }
};
