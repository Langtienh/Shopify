import { post } from "@/services/axios.helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// env
const EXP_REFRESH_TOKEN = +process.env.REFRESH_TOKEN! || 604800;
const EXP_TOKEN = +process.env.TOKEN! || 36000;

export const getConfigToken = async () => {
  const refreshToken = cookies().get("REFRESH_TOKEN")?.value;
  if (!refreshToken) redirect("/login");
  const token = cookies().get("TOKEN")?.value;
  const userId = cookies().get("USER_ID")?.value;
  // token hết hạn => refresh
  if (!token) {
    const token = await RefreshToken(refreshToken);
    const configToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return { configToken, userId, token };
  }
  const configToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return { configToken, userId, token };
};

const setToken = (token: string) => {
  cookies().set({
    name: "TOKEN",
    value: token,
    maxAge: EXP_TOKEN,
    secure: true,
    httpOnly: true,
    path: "/",
  });
};

const setRefreshToken = (refreshToken: string) => {
  cookies().set({
    name: "REFRESH_TOKEN",
    value: refreshToken,
    maxAge: EXP_REFRESH_TOKEN,
    secure: true,
    httpOnly: true,
    path: "/",
  });
};

export const setCookies = (
  key: string,
  value: string,
  maxAge: number = EXP_REFRESH_TOKEN,
  secure: boolean = true,
  httpOnly: boolean = true
) => {
  cookies().set({ name: key, value, maxAge, secure, httpOnly, path: "/" });
};

const RefreshToken = async (refreshToken: string) => {
  const res = await post<RefreshTokenResponse>("/users/refreshToken", {
    refreshToken,
  });
  setToken(res.data.token);
  setRefreshToken(res.data.refreshToken);
  return res.data.token;
};
