import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { checkAccount } from "@/services/auth";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [Google, Github],
  callbacks: {
    jwt: async ({ session, token, user, trigger, account, profile }) => {
      if (trigger === "update") {
        let newUser: User | undefined;
        if (session) newUser = session;
        if (newUser) token.customUser = newUser;
      }
      if (trigger === "signIn" && account?.providerAccountId) {
        const data = await checkAccount(account.providerAccountId);
        if (data) {
          token.refreshToken = data.refreshToken;
          token.token = data.token;
          token.customUser = data.user;
        }
        token.providerId = account.providerAccountId;
      }
      return token;
    },
    session: async ({ newSession, session, token, user, trigger }) => {
      session.customUser = token.customUser;
      session.token = token.token;
      session.refreshToken = token.refreshToken;
      session.user.id = token.providerId;
      return session;
    },
  },

  trustHost: true,
});
