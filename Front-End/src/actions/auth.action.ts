"use server";

import { get, post } from "@/actions/axios.helper";

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
  if (!res.data) return res;
  const data = res.data;

  const resUser = await get<UserResponse>("/users/my-info", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  });
  const user = resUser.data;

  return {
    message: res.message,
    status: res.status,
    data: {
      user,
      token: data.token,
      refreshToken: data.refreshToken,
    },
  };
};
