"use server";

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
export const updatePassword = async () => {};
export const updateUser = async () => {};
export const delUser = async () => {};
export const createUser = async () => {};
