"use server";

import { IUser } from "@/auth/next-auth";
import { post, put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const updateStatus = async (userId: number, status: boolean) => {
  try {
    const _status = status ? "true" : "false";
    const { configToken } = await getConfigToken();
    const res = await put(
      `/users/update-status/${userId}?active=${_status}`,
      undefined,
      configToken
    );
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const updateUser = async (user: {
  fullName: string;
  phone: string;
  email: string;
}) => {
  const { userId, configToken } = await getConfigToken();
  try {
    const res = await put(`/users/${userId}`, user, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
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
  try {
    const res = await put(`/users/${userId}`, user, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};
