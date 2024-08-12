"use server";
import { IUser } from "@/auth/next-auth";
import { get } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export const getMyInfo = async () => {
  await checkToken();
  const { token } = getToken();
  try {
    const res = await get<IUser>("/users/my-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
