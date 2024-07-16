"use server";

import { get, post } from "@/actions/axios.helper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const registerAction = async (input: RegisterForm) => {
  const registerDTO: RegisterDTO = {
    ...input,
    address: `${input.province}-${input.district}-${input.ward}`,
  };

  const res = await post<UserResponse>("/users/register", registerDTO);
  const data = res.data;
  return data;
};

export const loginAction = async (input: LoginDTO) => {
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

export const checkAccount = async (id: string) => {
  const res = await get<LoginResponse | null>(`users/login-with-google/${id}`);
  return res.data || null;
};

export const firstLogin = async (input: FirstLoginDTO) => {
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

export const logoutAction = async (token?: string) => {
  try {
    await post("/users/logout", { token });
  } catch {}
};

export const revalidatePathTo = (path: string) => {
  console.log("run >> server", path);
  revalidatePath(path);
  redirect(path);
};
