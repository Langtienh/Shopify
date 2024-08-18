"use server";

import { IUser } from "@/auth/next-auth";
import { post, put } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export const updateStatus = async (userId: string, status: boolean) => {
  const _status = status ? "true" : "false";
  const _id = userId.replace("USER0", "");
  await checkToken();
  const { token } = getToken();
  await put(`users/update-status/${_id}?active=${_status}`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateUser = async (user: {
  fullName: string;
  phone: string;
  email: string;
}) => {
  await checkToken();
  const { token, userId } = getToken();
  await put(`/users/${userId}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
