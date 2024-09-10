"use client";
import { triggerLogin } from "@/services/auth/action";
import { getCart, getCartInCookies } from "@/services/cart";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  itemsInCart?: number;
  updateCart: (cart?: CartType) => void;
  triggerUpdateCart: () => Promise<void>;
};

const initCart: CartType = {
  cartItems: [],
  id: 0,
  total: 0,
  totalProduct: 0,
  totalQuantity: 0,
  userId: 0,
};

const initialContext = {
  itemsInCart: undefined,
  updateCart: () => {},
  triggerUpdateCart: async () => {},
};

const CartContext = createContext<CartContextType>(initialContext);

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartType>(initCart);

  const { data } = useSession();

  const triggerUpdateCart = async () => {
    const cart = await getCart();
    setCart(cart);
  };

  useEffect(() => {
    const cartTrigger = async () => {
      if (data?.refreshToken && data.token && data.customUser) {
        const { cart } = await triggerLogin({
          refreshToken: data.refreshToken,
          token: data.token,
          user: data.customUser,
        });
        setCart(cart);
      } else {
        const cart = await getCartInCookies();
        if (cart) setCart(cart);
        else setCart(initCart);
      }
    };
    cartTrigger();
  }, [data]);

  const updateCart = (cart?: CartType) => {
    if (cart) setCart(cart);
    else setCart(initCart);
  };

  return (
    <CartContext.Provider
      value={{
        itemsInCart: cart?.totalQuantity,
        updateCart,
        triggerUpdateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
