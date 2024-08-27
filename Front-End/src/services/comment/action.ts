"use server";

import { post } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export const update = async () => {};
export const del = async () => {};
export const createComment = async (input: {
  rate: number;
  productId: number;
  content: string;
}) => {
  try {
    await checkToken();
    const { userId, token } = getToken();
    const res = await post(
      "/comments",
      { ...input, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error as ReqError;
  }
};
