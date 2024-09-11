"use server";

import { revalidatePath } from "next/cache";
import { del } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

export const update = async () => {};

export const deleteComment = async (commentId: number) => {
  const { configToken } = await getConfigToken();
  const res = await del(`/comments/${commentId}`, configToken);
  revalidatePath("/dashboard/comments");
  return res;
};
