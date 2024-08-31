import { getConfigTokenClient } from "../cookies/configTokenClient";
import { postFormData } from "./axios.helper";

export default async function uploadProductImage(
  formData: FormData,
  productId: number
) {
  const { configToken } = await getConfigTokenClient();
  const res = await postFormData(
    `/files/upload/product/${productId}`,
    formData,
    configToken
  );
  return res;
}
