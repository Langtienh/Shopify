"use client";
import { logout, triggerLogin, triggerUser } from "@/services/auth/action";
import { setIsFirstLogin } from "@/services/auth/action";
import { useSession, signOut } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useCart } from "./cart.context";
import { useWishList } from "./wishLish.context";

type AuthContextType = {
  user?: User;
  updateUser: (user?: User) => void;
  updateAvatar: (avatar: string) => void;
  authLogout: () => Promise<void>;
};

const initialContext = {
  user: undefined,
  updateUser: async () => {},
  updateAvatar: async () => {},
  authLogout: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { data } = useSession();

  const updateUser = (user?: User) => {
    setUser(user);
  };
  const updateAvatar = (avatar: string) => {
    if (user) {
      const newUser = { ...user, avatar };
      setUser(newUser);
    }
  };

  const { updateCart } = useCart();
  const { updateWishList } = useWishList();

  useEffect(() => {
    const trigger = async () => {
      if (data?.refreshToken && data.token && data.customUser) {
        setUser(data.customUser);
      } else if (data?.customUser) setUser(data.customUser);
      else if (data?.user && !data.customUser) await setIsFirstLogin();
      else {
        const user = await triggerUser();
        setUser(user);
      }
    };
    trigger();
  }, [data]);
  const authLogout = async () => {
    await logout();
    if (data?.user) await signOut({ callbackUrl: "/login" });
    updateUser();
    updateCart();
    updateWishList([]);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        updateAvatar,
        authLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
