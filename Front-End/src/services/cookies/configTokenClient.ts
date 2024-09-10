"use server";
import { getConfigToken } from "./check-token";

export const getConfigTokenClient = async () => {
  const { userId, configToken, token } = await getConfigToken();
  return { userId, configToken, token };
};
