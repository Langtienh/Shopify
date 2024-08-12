"use client";

import { setTotalQuantity } from "@/redux/cart/slice";
import { useAppDispatch } from "@/redux/store";
import { getCart } from "@/services/cart";
import { useEffect } from "react";

export default function CartTrigger(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const cart = await getCart();
      dispatch(setTotalQuantity(cart.totalQuantity));
    };
    fetchData();
  }, [dispatch]);
  return <></>;
}
