"use server";

import { del, post, put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const createAddress = async (address: Omit<Address, "id">) => {
  try {
    const { userId, configToken } = await getConfigToken();
    const res = await post("/address", { ...address, userId }, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const deleteAddress = async (addressId: number) => {
  try {
    const { configToken } = await getConfigToken();
    const res = await del(`/address/${addressId}`, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const setAddressDefault = async (address: Address) => {
  try {
    const _address = { ...address, default: true };
    const { configToken } = await getConfigToken();
    const res = await put(`/address/${address.id}`, _address, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};
