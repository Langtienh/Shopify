import { getConfigTokenClient } from "../cookies/configTokenClient";
import { postFormData } from "./axios.helper";

export default async function createComment(formData: FormData) {
  const { configToken, userId } = await getConfigTokenClient();
  formData.append("userId", userId?.toString() || "");
  try {
    const res = await postFormData(`/comments`, formData, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
}
