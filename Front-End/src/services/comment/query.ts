import { get } from "../axios.helper";

export const getAllCommentsByProductId = async (
  id: number
): Promise<CommentResponse[]> => {
  try {
    const res = await get<Page<CommentResponse>>(
      `/comments/product/${id}?page=1&limit=1000`
    );
    const products = res.data.result;
    return products;
  } catch {
    return [];
  }
};

export const getAllComments = async (page: number = 1, limit: number = 10) => {
  try {
    const res = await get<Page<CommentResponse>>(
      `/comments?page=${page}&limit=${limit}`
    );
    const products = res.data.result;
    return products;
  } catch {
    return [];
  }
};
