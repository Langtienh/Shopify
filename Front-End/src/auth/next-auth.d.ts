import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface AuthUser {
  id: string;
  email: string;
  image: string;
  name: string;
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    customUser?: User;
    token?: string;
    refreshToken?: string;
    providerId: string;
  }
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    customUser?: User;
    token?: string;
    refreshToken?: string;
    user: AuthUser;
  }
}
