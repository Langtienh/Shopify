"use client";
import { useGetCartQuery } from "@/redux/cart/services";
import { Badge } from "antd";
import Link from "next/link";
import { FaShopify } from "react-icons/fa";

export const Cart = () => {
  const { data } = useGetCartQuery();
  const counter = data
    ? data.reduce((total, item) => {
        return total + item.quantity;
      }, 0)
    : 0;
  return (
    <Badge count={counter}>
      <Link href="/cart">
        <div className="flex flex-col md:flex-row gap-1 items-center text-white">
          <FaShopify size={30} />
          <div className="text-[12px] hidden md:block">
            <p>Giỏ</p>
            <p>hàng</p>
          </div>
        </div>
      </Link>
    </Badge>
  );
};
