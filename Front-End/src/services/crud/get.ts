import { get } from "../axios.helper";

export const getCrud = async (query: string) => {
  const res = await get<Page<OrderResponse>>(`/enpoint?query=${query}`);

  return res;
};
