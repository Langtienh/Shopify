"use server";

import { cookies } from "next/headers";
import { get, post, put } from "../axios.helper";
import { getWishList } from "../wish-list";
import { getCart } from "../cart";
import { redirect } from "next/navigation";
import { getConfigToken } from "../cookies/check-token";

const EXP_REFRESH_TOKEN = +process.env.REFRESH_TOKEN! || 604800;
const EXP_TOKEN = +process.env.TOKEN! || 36000;

export const setCookies = (
  key: string,
  value: string,
  maxAge: number = EXP_REFRESH_TOKEN,
  secure: boolean = true,
  httpOnly: boolean = true
) => {
  cookies().set({
    name: key,
    value,
    maxAge,
    secure,
    httpOnly,
    path: "/",
  });
};

const initCart: CartType = {
  cartItems: [],
  id: 0,
  total: 0,
  totalProduct: 0,
  totalQuantity: 0,
  userId: 0,
};

const subTrigger = async () => {
  try {
    const wishList = await getWishList();
    const _wishList = wishList.map((item) => item.productId);
    const cart = await getCart();
    return {
      cart,
      wishList: _wishList,
    };
  } catch {
    return { cart: initCart, wishList: [] };
  }
};

export const triggerLogin = async (data: LoginResponse) => {
  setCookies("REFRESH_TOKEN", data.refreshToken, EXP_REFRESH_TOKEN);
  setCookies("TOKEN", data.token, EXP_TOKEN);
  setCookies("USER", JSON.stringify(data.user));
  setCookies("USER_ID", data.user.id.toString());
  const { cart, wishList } = await subTrigger();
  setCookies("WISH_LIST", JSON.stringify(wishList));
  setCookies("cart", JSON.stringify(cart));
  return { wishList, cart };
};

const triggerLogout = async () => {
  cookies().delete("TOKEN");
  cookies().delete("REFRESH_TOKEN");
  cookies().delete("USER");
  cookies().delete("USER_ID");
  cookies().delete("Cart");
  cookies().delete("WISH_LIST");
  cookies().delete("setIsFirstLogin");
};

export const login = async (input: LoginDTO) => {
  try {
    const res = await post<LoginResponse>("/users/login", input);
    const data = res.data;
    const { cart, wishList } = await triggerLogin(data);
    cookies().set("isCredentials", JSON.stringify(true));
    return { cart, wishList, user: data.user };
  } catch {
    return undefined;
  }
};

export const checkAccount = async (id: string) => {
  try {
    const res = await get<LoginResponse>(`/users/login-with-google/${id}`);
    const data = res.data;
    return data;
  } catch {
    return undefined;
  }
};

export const firstLoginByprovider = async (input: FirstLoginDTO) => {
  const res = await post<LoginResponse>("/users/login-with-google", input);
  const data = res.data;
  await triggerLogin(data);
  cookies().delete("isFirstLogin");
  await triggerLogin(data);
  return data.user;
};

export const logout = async () => {
  const { token } = await getConfigToken();
  await post(`/users/logout`, {
    token,
  });
  await triggerLogout();
  const isCredentials = cookies().has("isCredentials");
  if (isCredentials) {
    cookies().delete("isCredentials");
    redirect("/login");
  }
};

export const register = async (input: RegisterForm) => {
  const res = await post("/users/register", input);
  return res;
};

// handle resetPassword

export const verifyMail = async (mail: string) => {
  const res = await post(`/users/verify-mail/${mail}`);
  return res;
};
type VerifyOTP = {
  userId: string;
  otpToken: string;
};
export const verifyOTP = async (mail: string, OTP: string) => {
  const res = await post<VerifyOTP>(`/users/verify-otp/${OTP}/${mail}`);
  cookies().set("otpToken", res.data.otpToken);
  cookies().set("userId", res.data.userId);
  return res;
};

export const resetPassword = async (newPassword: string) => {
  const otpToken = cookies().get("otpToken")?.value;
  const userId = cookies().get("userId")?.value;

  const res = await put(`/users/reset-password/${userId}`, {
    otpToken,
    newPassword,
  });
  cookies().delete("otpToken");
  cookies().delete("userId");
  return res;
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const { userId, configToken } = await getConfigToken();

  const res = await put(
    `users/change-password/${userId}`,
    { oldPassword, newPassword },
    configToken
  );
  return res;
};

const getCookies = (key: string) => cookies().get(key)?.value;

export const triggerUser = async () => {
  const _user = getCookies("USER");
  if (_user) {
    const user: User = JSON.parse(_user);
    return user;
  }
};

export const triggerCheckFirstLogin = async () => {
  cookies().has("isFirstLogin");
};
export const triggerDelFirstLogin = async () => {
  cookies().delete("isFirstLogin");
};
export const setIsFirstLogin = async () => {
  cookies().set("isFirstLogin", JSON.stringify(true));
};
