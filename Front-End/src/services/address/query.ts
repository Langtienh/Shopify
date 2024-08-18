"use server";

import { wardCodeToPath } from "../address.helper";
import { get } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export const getMyAddress = async () => {
  await checkToken();
  const { token, userId } = getToken();
  const res = await get<Address[]>(`/address/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const addresses = res.data.map((address) => ({
    ...address,
    path: wardCodeToPath(address.code),
  }));
  return addresses;
};
