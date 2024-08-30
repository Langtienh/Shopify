import { getConfigTokenClient } from "../cookies/configTokenClient";
import { postFormData } from "./axios.helper";

export default async function uploadAvatar(formData: FormData) {
  const { configToken, userId } = await getConfigTokenClient();
  try {
    const res = await postFormData(
      `/files/upload/user/${userId}`,
      formData,
      configToken
    );
    return res;
  } catch (error) {
    return error as ReqError;
  }
}
