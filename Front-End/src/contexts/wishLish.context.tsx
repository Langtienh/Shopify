"use client";
import { triggerLogin } from "@/services/auth/action";
import {
  createWishListItem,
  delWishListItem,
  triggerWishList,
} from "@/services/wish-list/action";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type WishListContextType = {
  wishList: number[];
  updateWishList: (wishList: number[]) => void;
  createWishList: (productId: number) => Promise<ResponseSuccess<any>>;
  deleteWishList: (productId: number) => Promise<ResponseSuccess<any>>;
};

const initialReponse: ResponseSuccess<unknown> = {
  status: 0,
  message: "",
  data: true,
};

const initialContext = {
  wishList: [],
  updateWishList: async (wishList: number[]) => {},
  createWishList: async (productId: number) => {
    return initialReponse;
  },
  deleteWishList: async (productId: number) => {
    return initialReponse;
  },
};

const WishListContext = createContext<WishListContextType>(initialContext);

export const useWishList = () => {
  const context = useContext(WishListContext);
  return context;
};

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishList, setWishList] = useState<number[]>([]);

  const { data } = useSession();

  useEffect(() => {
    const trigger = async () => {
      if (data?.refreshToken && data.token && data.customUser) {
        const { cart, wishList } = await triggerLogin({
          refreshToken: data.refreshToken,
          token: data.token,
          user: data.customUser,
        });
        updateWishList(wishList);
      } else {
        const wishList = await triggerWishList();
        if (wishList) setWishList(wishList);
      }
    };

    trigger();
  }, [data]);

  const updateWishList = (wishList: number[]) => {
    setWishList(wishList);
  };

  const createWishList = async (productId: number) => {
    const res = await createWishListItem(productId);
    setWishList((pre) => [...pre, productId]);
    return res;
  };

  const deleteWishList = async (productId: number) => {
    const res = await delWishListItem(productId);
    setWishList((pre) => [...pre.filter((item) => item != productId)]);
    return res;
  };

  return (
    <WishListContext.Provider
      value={{ wishList, updateWishList, createWishList, deleteWishList }}
    >
      {children}
    </WishListContext.Provider>
  );
}
