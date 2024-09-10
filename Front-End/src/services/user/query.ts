"use server";
import { get } from "../axios.helper";
import { getMyAddress } from "../address";
import { getConfigToken } from "../cookies/check-token";

export const getUser = async (
  limit: number = 5,
  page: number = 1,
  name?: string
) => {
  const { configToken } = await getConfigToken();

  let query = `/users?page=${page}&limit=${limit}`;
  if (name) query += `&name=${name}`;
  const res = await get<Page<User>>(query, configToken);
  return res.data;
};

export const getUserById = async (id: string) => {
  const { configToken } = await getConfigToken();

  try {
    const res = await get<User>(`/users/${id}`, configToken);
    return res.data;
  } catch {}
};

export const getMyInfoBasic = async () => {
  const { configToken } = await getConfigToken();

  const res = await get<User>("/users/my-info", configToken);
  return res.data;
};

export const getMyInfo = async () => {
  const [user, addresses] = await Promise.all([
    getMyInfoBasic(),
    getMyAddress(),
  ]);
  const addressDefautl =
    addresses.find((address) => address.default) || addresses[0];
  return { user, addressDefautl };
};
