"use server";

import { revalidatePath } from "next/cache";
import { put } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

export const updateStatus = async (userId: number, status: boolean) => {
  const _status = status ? "true" : "false";
  const { configToken } = await getConfigToken();
  const res = await put(
    `/users/update-status/${userId}?active=${_status}`,
    undefined,
    configToken
  );
  revalidatePath("/dashboard/users");
  return res;
};

export const updateUser = async (user: {
  fullName: string;
  phone: string;
  email: string;
}) => {
  const { userId, configToken } = await getConfigToken();
  const res = await put(`/users/${userId}`, user, configToken);
  revalidatePath("/dashboard/users");
  return res;
};

export const updateUserById = async (
  userId: number,
  user: {
    fullName: string;
    phone: string;
    email: string;
  }
) => {
  const { configToken } = await getConfigToken();
  const res = await put(`/users/${userId}`, user, configToken);
  revalidatePath("/dashboard/users");
  return res;
};
