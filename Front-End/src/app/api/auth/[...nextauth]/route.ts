import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { cookies } from "next/headers";

const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET!,
  providers: [
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
    async session({ session, token }) {
      const user = {
        googleId: token.sub,
        avatar: token.picture,
        fullName: token.name,
        email: token.email,
      };
      session.user = user;
      cookies().set({
        name: "user",
        value: JSON.stringify(user),
      });
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
