import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  fullName?: string | null;
  email?: string | null;
  avatar?: string | null;
  phone?: string;
  id: number;
  providerId?: string;
  active?: boolean;
  roles?: string[];
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    token?: string;
    refreshToken?: string;
    user?: IUser;
    exp_token: number;
  }
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: IUser;
    token?: string;
    refreshToken?: string;
    exp_token: number;
  }
}
