"use server";
import { getToken, checkToken } from "../cookies";
import { get } from "../axios.helper";
export const getUser = async (limit: number = 5, page: number = 1) => {
  await checkToken();
  const { token } = getToken();
  const res = await get<Page<UserResponse>>(
    `/users?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = res.data.result.map((user) => ({
    ...user,
    id: `USER0${user.id}`,
  }));
  return { ...res.data, result };
};
