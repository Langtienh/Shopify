"use server";

import { get, post } from "@/actions/axios.helper";
import { DELAY } from "@/utils/delay";

import { cookies } from "next/headers";
interface UserResponse {
  // Thêm các thuộc tính cần thiết cho phản hồi người dùng
}

interface ResponseSuccess<T> {
  data: T;
  // Thêm các thuộc tính cần thiết cho phản hồi thành công
}

export const registerAction = async (input: RegisterForm) => {
  const registerDTO: RegisterDTO = {
    fullName: input.fullName,
    phone: input.phone,
    password: input.password,
    email: input.email,
    address: `${input.province}-${input.district}-${input.ward}`,
    avatar: input.avatar,
  };

  // Tạo độ trễ 300 mili giây
  await DELAY(300);
  try {
    const res = await post<ResponseSuccess<UserResponse>>(
      "/users/register",
      registerDTO
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Registration failed", error);
    return false;
  }
};

export const loginAction = async (input: LoginDTO) => {
  // Tạo độ trễ 300 mili giây
  await DELAY(300);
  try {
    const res = await post<ResponseSuccess<LoginResponse>>(
      "/users/login",
      input
    );
    const data = res.data;
    const resUser = await get<ResponseSuccess<UserResponse>>("/users/my-info", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    const user = resUser.data;
    cookies().set({
      name: "token",
      value: data.token,
      httpOnly: true,
      path: "/",
    });
    cookies().set({
      name: "refreshToken",
      value: data.refreshToken,
      httpOnly: true,
      path: "/",
    });

    cookies().set({
      name: "user",
      value: JSON.stringify(user),
      path: "/",
    });
    return user;
  } catch (error) {
    console.error("Registration failed", error);
    return false;
  }
};

export const logoutAction = async () => {
  cookies().delete({
    name: "token",
  });
  cookies().delete({
    name: "refreshToken",
  });

  cookies().delete({
    name: "user",
  });
};
