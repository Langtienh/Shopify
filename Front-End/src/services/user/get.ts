"use server";
import { getToken, checkToken } from "../cookies";
import { get } from "../axios.helper";
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
    id: `USER0${user.id}`,
  }));
  return { ...res.data, result };
};
