import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { checkAccount, loginAction } from "@/actions/auth.action";
const BASE_URL = process.env.FRONT_END_URL!;
const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Số điện thoại",
      credentials: {
        phone: { label: "Số điện thoại" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        const res = await loginAction({
          phone: credentials?.phone!,
          password: credentials?.password!,
        });
        const user = res.data as any;
        if (user) {
          return user;
        } else {
          // return null;
          throw new Error(res.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    // Đặt thời gian sống cho phiên bằng thời hạn của reresh_token, hết hạn => logout
    maxAge: +process.env.REFRESH_TOKEN! || 30 * 24 * 60 * 60, // 30 ngày
    // Tần suất cập nhật lại phiên = thời hạn của token, hết hạn => refresh
    updateAge: +process.env.TOKEN! || 24 * 60 * 60, // 1 ngày
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user?.id && account?.provider !== "credentials") {
        const res = await checkAccount(user.id);
        if (!res) return `${BASE_URL}/register?phone=false`;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url && url[url.length - 1] === "/") url.replace(/\/$/, "");
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token, trigger, newSession, user }) {
      session.user = token.user;
      session.refreshToken = token.refreshToken;
      if (token.sub && !session.refreshToken) {
        const res = await checkAccount(token.sub);
        if (res) {
          session.refreshToken = res.refreshToken;
        }
      }

      // session.expires = // todo
      return session;
    },
    async jwt({ token, account, trigger, user, profile, session }) {
      if (
        (trigger === "signIn" && account?.provider === "github") ||
        account?.provider === "google"
      ) {
        const customUser = {
          providerId: token.sub,
          avatar: token.picture,
          fullName: token.name,
          email: token.email,
        };
        token.user = customUser;
      } else if (account?.provider === "credentials") {
        // @ts-ignore
        token = user;
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler, authOptions };
