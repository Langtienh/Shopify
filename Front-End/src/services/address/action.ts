"use server";

import { del, post, put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const createAddress = async (address: Omit<Address, "id">) => {
  const { userId, configToken } = await getConfigToken();
  const res = await post("/address", { ...address, userId }, configToken);
  return res;
};

export const deleteAddress = async (addressId: number) => {
  const { configToken } = await getConfigToken();
  const res = await del(`/address/${addressId}`, configToken);
  return res;
};

export const setAddressDefault = async (address: Address) => {
  const _address = { ...address, default: true };
  const { configToken } = await getConfigToken();
  const res = await put(`/address/${address.id}`, _address, configToken);
  return res;
};
