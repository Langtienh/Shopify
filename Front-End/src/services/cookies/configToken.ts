import { checkToken } from "./check-token";
import { getToken } from "./gettoken";

export const getConfigToken = async () => {
  await checkToken();
  const { userId, token } = getToken();
  const configToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return { userId, configToken };
};