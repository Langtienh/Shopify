import { get } from "../axios.helper";

export const getAllComments = async (
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
