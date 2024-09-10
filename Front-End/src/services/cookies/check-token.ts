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
  // gia hạn lại nếu refresh token được gia hạn
  const USER = cookies().get("USER")?.value;
  if (USER) cookies().set("USER", USER);
  const USER_ID = cookies().get("USER_ID")?.value;
  if (USER_ID) cookies().set("USER_ID", USER_ID);
  const Cart = cookies().get("Cart")?.value;
  if (Cart) cookies().set("Cart", Cart);
  const WISH_LIST = cookies().get("WISH_LIST")?.value;
  if (WISH_LIST) cookies().set("WISH_LIST", WISH_LIST);
  return res.data.token;
};
