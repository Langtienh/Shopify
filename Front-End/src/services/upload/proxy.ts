import { PrefixUpload } from "@/constans/enum";
import { axiosProxy } from "./axios.helper";

export default async function proxyUpload<T>(
  prefix: PrefixUpload,
  formData: FormData,
  productId?: number
): Promise<TResponse & { data: T }> {
  let url: string = prefix;
  if (productId) url += `?productId=${productId}`;
  const response = await axiosProxy.post<TResponse & { data: T }>(
    url,
    formData
  );
  return response.data;
}
