"use server";

import { cookies } from "next/headers";
import { get, post, put } from "../axios.helper";
import { checkToken, getToken } from "../cookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  const res = await get<LoginResponse | null>(`users/login-with-google/${id}`);
  return res.data || null;
};

export const firstLoginByprovider = async (input: FirstLoginDTO) => {
  const res = await post<LoginResponse>("/users/login-with-google", input);
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

export const logout = async () => {
  await checkToken();
  const token = cookies().get("TOKEN")?.value;
  cookies().delete("TOKEN");
  cookies().delete("REFRESH_TOKEN");
  cookies().delete("authjs.csrf-token");
  cookies().delete("authjs.session-token");
  await post(`/users/logout`, {
    token,
  });
  redirect("/login");
};
export const register = async (input: RegisterForm) => {
  const registerDTO: RegisterDTO = {
    ...input,
    address: `${input.province}-${input.district}-${input.ward}`,
  };

  const res = await post("/users/register", registerDTO);
  return res;
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
    return {};
  } catch {
    return { message: "OTP Không chính xác. Vui lòng thử lại" };
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
    return { message: res.message, isSucsess: true };
  } catch {
    return { message: "Đã xảy ra lỗi", isSucsess: false };
  }
};

export const updatePassword = async () => {};

export const revalidatePathTo = (path: string) => {
  revalidatePath(path);
  redirect(path);
};
