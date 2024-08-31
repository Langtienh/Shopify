import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { checkAccount, login } from "@/services/auth";
const EXP_REFRESH_TOKEN = +process.env.REFRESH_TOKEN! || 604800;
const EXP_TOKEN = +process.env.TOKEN! || 36000;
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      name: "Đăng nhập bằng số điện thoại",
      credentials: {
        phone: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials.password || !credentials.phone)
          throw new Error("Vui lòng điền đủ thông tin");
        else {
          const res = await login({
            password: credentials.password as string,
            phone: credentials.phone as string,
          });
          if (!res?.data) {
            throw new Error("Tài khoản hoặc mật khẩu không đúng");
          } else {
            const data = {
              refreshToken: res.data.refreshToken,
              token: res.data.token,
              user: res.data.user,
            };
            return data as any;
          }
        }
      },
    }),
    Google,
    Github,
  ],
  callbacks: {
    signIn: async ({ account, user, credentials, email, profile }) => {
      return true;
    },
    jwt: async ({ session, token, user, trigger, account, profile }) => {
      const exp_token = Date.now() + EXP_TOKEN;
      if (trigger === "update") {
        if (session.user) token.user = session.user;
        if (session.token) token.token = session.token;
        if (session.refreshToken) token.refreshToken = session.refreshToken;
        token.exp_token = exp_token;
        return token;
      }
      if (trigger === "signIn") {
        if (account?.providerAccountId && account?.provider !== "credentials") {
          let customUser = {
            providerId: account?.providerAccountId,
            avatar: token.picture,
            fullName: token.name,
            email: token.email,
          };
          const res = await checkAccount(account.providerAccountId);
          if (res) {
            token.token = res?.token;
            token.refreshToken = res?.refreshToken;

            customUser = {
              ...res.user,
              avatar: res.user.avatar,
              providerId: account?.providerAccountId,
            };
          }
          // @ts-ignore
          token.user = customUser;
        } else if (account?.provider === "credentials") {
          // @ts-ignore
          token = user;
        }
        token.exp_token = exp_token;
        return token;
      }
      const newToken = {
        user: token.user,
        refreshToken: token.refreshToken,
        exp_token: token.exp_token,
        token: token.token,
      };
      return newToken;
    },
    session: async ({ newSession, session, token, user, trigger }) => {
      const sessionCustom = {
        user: token.user,
        refreshToken: token.refreshToken,
        exp_token: token.exp_token,
        token: token.token,
      };
      // @ts-ignore
      (session.user = token.user),
        (session.token = token.token),
        (session.refreshToken = token.refreshToken),
        (session.exp_token = token.exp_token);
      return session;
    },
  },
  trustHost: true,
  session: {
    maxAge: EXP_REFRESH_TOKEN,
    updateAge: EXP_REFRESH_TOKEN,
  },
});
