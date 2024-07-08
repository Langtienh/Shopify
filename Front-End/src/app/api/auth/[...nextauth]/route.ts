import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { loginAction } from "@/actions/auth.action";
const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Số điện thoại",
      credentials: {
        username: { label: "Số điện thoại" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        const res = await loginAction({
          username: credentials?.username!,
          password: credentials?.password!,
        });
        if (res.data) {
          return res.data as any;
        } else {
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
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      session.user = token.user;
      // session.expires = // todo
      return session;
    },
    async jwt({ token, account, trigger, user }) {
      if (
        (trigger === "signUp" && account?.provider === "github") ||
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

export { handler as GET, handler as POST };
