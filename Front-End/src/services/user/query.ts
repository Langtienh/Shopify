"use server";
import { getToken, checkToken } from "../cookies";
import { get } from "../axios.helper";
import { IUser } from "@/auth/next-auth";
import { getMyAddress } from "../address";

export const getUser = async (
  limit: number = 5,
  page: number = 1,
  name?: string
) => {
  await checkToken();
  const { token } = getToken();
  let query = `/users?page=${page}&limit=${limit}`;
  if (name) query += `&name=${name}`;
  const res = await get<Page<UserResponse>>(query, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = res.data.result.map((user) => ({
    ...user,
    id: `user0${user.id}`,
  }));
  return { ...res.data, result };
};

export const getUserById = async (id: string) => {
  await checkToken();
  const { token } = getToken();
  const _id = id.replace("user0", "");
  try {
    const res = await get<IUser>(`/users/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch {}
};

export const getMyInfoBasic = async () => {
  await checkToken();
  const { token } = getToken();
  const res = await get<IUser>("/users/my-info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
