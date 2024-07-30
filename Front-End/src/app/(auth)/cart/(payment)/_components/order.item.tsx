"use client";
import { priceShow, priceThrough } from "@/lib/ultils";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";

export default function OrderItem() {
  const cart = useAppSelector((state) => state.cart.payment);
  if (cart.length)
    return (
      <ul className="p-[10px] border rounded-lg shadow-md bg-white mb-7">
        {cart.map((item) => (
          <li
            key={`cart-item${item.id}`}
            className="last:border-0 border-b py-3 flex gap-5"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="basis-[100px]"
            />
            <div className="flex-1">
              <p>{item.name}</p>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-baseline">
                  <p className="text-red-600 font-bold">
                    {priceShow(item.price, item.discount)}
                  </p>
                  <p className="text-sm line-through text-gray-400 pl-2">
                    {priceThrough(item.price)}
                  </p>
                </div>
                <p>
                  <span>Số lượng</span>
                  <span className="text-red-600 pl-1">{item.quantity}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  return <></>;
}
