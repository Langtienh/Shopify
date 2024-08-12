"use server";

import { auth } from "@/auth/auth";

export default async function isLoginFc() {
  const _auth = await auth();
  const isLogin = _auth?.refreshToken && _auth.user;
  return !!isLogin;
}
