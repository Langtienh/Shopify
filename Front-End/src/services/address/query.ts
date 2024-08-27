"use server";
import { wardCodeToPath } from "../address.helper";
import { get } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const getMyAddress = async () => {
  const { userId, configToken } = await getConfigToken();
  const res = await get<Address[]>(`/address/user/${userId}`, configToken);
  const addresses = res.data.map((address) => ({
    ...address,
    path: wardCodeToPath(address.code),
  }));
  return addresses;
};
