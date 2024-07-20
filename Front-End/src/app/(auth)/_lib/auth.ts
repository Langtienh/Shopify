"use server";

import { auth } from "@/auth/auth";

export const getSession = async () => {
  const session = await auth();
  return session;
};
