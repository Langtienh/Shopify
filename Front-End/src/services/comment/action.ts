"use server";

import { del, post } from "../axios.helper";
import { checkToken, getConfigToken, getToken } from "../cookies";

export const update = async () => {};

export const createComment = async (input: {
  rate: number;
  productId: number;
  content: string;
}) => {
  const { configToken, userId } = await getConfigToken();
  try {
    const res = await post("/comments", { ...input, userId }, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const deleteComment = async (commentId: number) => {
  const { configToken } = await getConfigToken();
  try {
    const res = await del(`/comments/${commentId}`, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};
