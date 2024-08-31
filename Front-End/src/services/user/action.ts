"use server";

import { put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const updateStatus = async (userId: number, status: boolean) => {
  const _status = status ? "true" : "false";
  const { configToken } = await getConfigToken();
  const res = await put(
    `/users/update-status/${userId}?active=${_status}`,
    undefined,
    configToken
  );
  return res;
};

export const updateUser = async (user: {
  fullName: string;
  phone: string;
  email: string;
}) => {
  const { userId, configToken } = await getConfigToken();
  const res = await put(`/users/${userId}`, user, configToken);
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
  return res;
};
