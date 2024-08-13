"use client";

import { setTotalQuantity } from "@/redux/cart/slice";
import { useAppDispatch } from "@/redux/store";
import { setWishList } from "@/redux/wish-list/slice";
import { useEffect } from "react";

export default function LogoutTrigger() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTotalQuantity(0));
    dispatch(setWishList([]));
  }, [dispatch]);
  return <></>;
}
