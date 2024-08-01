"use client";
import { useAppSelector } from "@/redux/store";
import { CartInfo } from "./info";

export default function OrderItem() {
  const cart = useAppSelector((state) => state.cart.payment);
  if (cart.length) return <CartInfo cart={cart} />;
  return <></>;
}
