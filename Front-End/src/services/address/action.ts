"use server";

import { del, post, put } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export const createAddress = async (address: Omit<Address, "id">) => {
  await checkToken();
  const { token, userId } = getToken();
  await post(
    "/address",
    { ...address, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const deleteAddress = async (addressId: number) => {
  await checkToken();
  const { token } = getToken();
  await del(`/address/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setAddressDefault = async (address: Address) => {
  const _address = { ...address, default: true };
  await checkToken();
  const { token } = getToken();
  await put(`/address/${address.id}`, _address, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
