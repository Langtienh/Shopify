import { get } from "../axios.helper";
import { getConfigTokenClient } from "../cookies/configTokenClient";

export const getAllCommentsByProductId = async (
  id: number
): Promise<CommentResponse[]> => {
  try {
    const res = await get<Page<CommentResponse>>(
      `/comments/product/${id}?page=1&limit=1000`
    );
    const comments = res.data.result;
    return comments;
  } catch {
    return [];
  }
};

export const getAllComments = async (page: number = 1, limit: number = 10) => {
  const { configToken } = await getConfigTokenClient();
  try {
    const res = await get<Page<CommentResponse>>(
      `/comments?page=${page}&limit=${limit}`,
      configToken
    );
    const comments = res.data.result;
    const totalItem = res.data.totalItem;
    return { comments, totalItem };
  } catch {
    return [];
  }
};
