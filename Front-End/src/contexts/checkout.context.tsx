"use client";
import { createContext, useContext, useEffect, useState } from "react";

type UserInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

type CheckoutContextType = {
  userInfo?: UserInfo;
  totalPrice: number;
  updateTotalPrice: (totalPrice: number) => void;
  updateUserInfo: (user: UserInfo) => void;
};

const initialContext: CheckoutContextType = {
  totalPrice: 0,
  updateTotalPrice: () => {},
  updateUserInfo: () => {},
};

const checkoutContext = createContext<CheckoutContextType>(initialContext);

export const useCheckout = () => {
  const context = useContext(checkoutContext);
  return context;
};

export default function CheckoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const updateTotalPrice = (totalPrice: number) => {
    setTotalPrice(totalPrice);
  };

  const updateUserInfo = (user?: UserInfo) => {
    setUserInfo(user);
  };

  return (
    <checkoutContext.Provider
      value={{ totalPrice, userInfo, updateTotalPrice, updateUserInfo }}
    >
      {children}
    </checkoutContext.Provider>
  );
}
