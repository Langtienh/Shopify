"use client";

import { setTotalQuantity } from "@/redux/cart/slice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";

export default function CartTriggerAction({
  totalQuantity,
}: {
  totalQuantity: number;
}): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTotalQuantity(totalQuantity));
  }, [dispatch, totalQuantity]);
  return <></>;
}
