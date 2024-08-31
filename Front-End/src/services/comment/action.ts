"use server";

import { del } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const update = async () => {};

export const deleteComment = async (commentId: number) => {
  const { configToken } = await getConfigToken();
  const res = await del(`/comments/${commentId}`, configToken);
  return res;
};
