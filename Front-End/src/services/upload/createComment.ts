import { getConfigTokenClient } from "../cookies/configTokenClient";
import { postFormData } from "./axios.helper";

export default async function createComment(formData: FormData) {
  const { configToken, userId } = await getConfigTokenClient();
  formData.append("userId", userId?.toString() || "");
  const res = await postFormData(`/comments`, formData, configToken);
  return res;
}
