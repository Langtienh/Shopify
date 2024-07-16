import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { checkAccount } from "@/app/(auth)/_lib/actions";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      name: "Số điện thoại",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        id: {},
        fullName: {},
        phone: {},
        email: {},
        address: {},
        avatar: {},
        active: {},
        roles: {},
        refreshToken: {},
        token: {},
      },
      authorize: async (credentials) => {
        const user = {
          id: credentials.id,
          fullName: credentials.fullName,
          phone: credentials.phone,
          email: credentials.email,
          address: credentials.address,
          avatar: credentials.avatar,
          active: credentials.active,
          // @ts-ignore
          roles: credentials.roles.split(",") || [],
        };
        if (credentials.refreshToken && credentials.token && user) {
          const data = {
            refreshToken: credentials.refreshToken,
            token: credentials.token,
            user,
          };
          return data as any;
        }
        return null;
      },
    }),
    Google,
    Github,
  ],
  callbacks: {
    // authorized: async ({ auth, request }) => {
    //   console.log("check >>>");
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth;
    // },
    signIn: async ({ account, user, credentials, email, profile }) => {
      return true;
    },
    jwt: async ({ session, token, user, trigger, account, profile }) => {
      if (trigger === "update") {
        if (session.user) token.user = session.user;
        if (session.token) token.token = session.token;
        if (session.refreshToken) token.refreshToken = session.refreshToken;
        return token;
      }
      if (
        trigger === "signIn" &&
        account?.providerAccountId &&
        account?.provider !== "credentials"
      ) {
        const customUser = {
          providerId: account?.providerAccountId,
          avatar: token.picture,
          fullName: token.name,
          email: token.email,
        };
        // token.
        token.user = customUser;
        const res = await checkAccount(account.providerAccountId);
        if (res) {
          token.token = res?.token;
          token.refreshToken = res?.refreshToken;
        }
      } else if (trigger === "signIn" && account?.provider === "credentials") {
        // @ts-ignore
        token = user;
      }
      return token;
    },
    session: async ({ newSession, session, token, user, trigger }) => {
      if (trigger === "update") {
        console.log("run update session");
      }
      // @ts-ignore
      (session.user = token.user),
        (session.token = token.token),
        (session.refreshToken = token.refreshToken),
        console.log("");
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  session: {
    maxAge: 2592000,
    updateAge: 86400,
  },
});
