"use server";

import { get, post } from "@/actions/axios.helper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

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
  const dataCustom = {
    user: data.user,
    refreshToken: data.refreshToken,
  };
  return {
    message: res.message,
    status: res.status,
    data: dataCustom,
  };
};

export const checkAccount = async (id: string) => {
  const res = await get<LoginResponse | null>(`users/login-with-google/${id}`);
  return res.data || null;
};
