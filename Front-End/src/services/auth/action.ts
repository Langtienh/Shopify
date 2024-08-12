"use server";

import { cookies } from "next/headers";
import { get, post } from "../axios.helper";
import { checkToken, getToken } from "../cookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

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

export const resetPassword = async () => {};

export const updatePassword = async () => {};

export const revalidatePathTo = (path: string) => {
  revalidatePath(path);
  redirect(path);
};
