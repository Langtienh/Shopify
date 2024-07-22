"use client";

import { useGetCartQuery } from "@/redux/cart/services";
import { Checkbox, InputNumber } from "antd";
import Image from "next/image";
import Link from "next/link";
import {
  discoutForMember,
  priceShow,
  priceThrough,
  productToSlug,
} from "@/lib/ultils";
import { IoGift } from "react-icons/io5";
import {
  AddItemBTN,
  ClearListBtn,
  DeleteItemBTN,
  SubItemBTN,
} from "@/app/(auth)/cart/_components/cart/button";
import CartSkeleton from "@/app/(auth)/cart/_components/cart/cart.skeleton";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { checkedAll, checkedTogger, cloneCart } from "@/redux/cart/slice";
import { useEffect, useState } from "react";

export default function Cart() {
  const { data, isFetching, isLoading } = useGetCartQuery();
  const [cart, setCart] = useState<CartItemResponse[]>([]);
  const dispath = useAppDispatch();
  useEffect(() => {
    if (data?.cartItems) setCart(data.cartItems);
    else setCart([]);
    dispath(cloneCart(data?.cartItems ?? []));
  }, [data, dispath]);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const checked = useAppSelector((state) => state.cart.checked);
  useEffect(() => {
    const length = checked.length;
    if (data?.cartItems.length) {
      setIndeterminate(0 < length && length < data.cartItems.length);
      setCheckAll(length === data.cartItems.length);
    }
  }, [checked, data]);
  const changeCheckBox = (e: CheckboxChangeEvent, id: number) => {
    const checked = e.target.checked;
    dispath(checkedTogger({ checked, id }));
  };

  const onAll = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    dispath(checkedAll(checked));
  };
  if (cart.length)
    return (
      <>
        <div className="flex justify-between items-center mb-[10px] h-9">
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={onAll}
          >
            <div className="text-base">Chọn tất cả</div>
          </Checkbox>
          {(indeterminate || checkAll) && (
            <ClearListBtn disabled={isFetching} />
          )}
        </div>
        <ul className=" flex flex-col gap-[20px] mb-[100px]">
          {cart.map((item) => (
            <li
              key={item.id}
              className="p-[10px] rounded-lg bg-white border shadow-lg"
            >
              <div className="py-[10px] flex justify-between">
                <div className="w-[114px] flex-shrink-0 flex-grow-0 flex">
                  <div className="flex flex-col">
                    <Checkbox
                      onChange={(e) => changeCheckBox(e, item.id)}
                      className="mb-auto"
                      checked={checked.includes(item.id)}
                    />
                  </div>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt={item.name}
                  />
                </div>
                <div className=" w-3/4 flex flex-col gap-2 justify-between">
                  <div className="flex justify-between">
                    <Link
                      className="flex-1 hover:underline text-[#3a3a3a] hover:text-[#6a6a6a]"
                      href={productToSlug(item)}
                    >
                      {item.name}
                    </Link>
                    <div className="w-[1/6] flex flex-shrink-0 justify-end">
                      <DeleteItemBTN disabled={isFetching} id={item.id} />
                    </div>
                  </div>
                  <div className="flex gap-[10px] flex-wrap justify-between items-center">
                    <div className="flex gap-[10px] items-baseline">
                      <p className="text-red-600 font-bold text-[17px]">
                        {priceShow(item)}
                      </p>
                      <p className="text-gray-600 font-bold text-sm line-through">
                        {priceThrough(item)}
                      </p>
                    </div>
                    <div className="px-0 ml-auto">
                      <div className="flex">
                        <SubItemBTN
                          disabled={isFetching || item.quantity === 1}
                          cartItem={item}
                        />
                        <div className="w-10 flex justify-center">
                          <InputNumber readOnly value={item.quantity} />
                        </div>
                        <AddItemBTN cartItem={item} disabled={isFetching} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-6 my-6">
                <div className="flex gap-2">
                  <IoGift size={24} />
                  <p>Chương trình khuyến mãi</p>
                </div>
                <ul className="pl-10 pt-1 list-disc text-[13px]">
                  <li className="text-base text-red-600 font-bold">
                    Giảm thêm {discoutForMember(item)} cho SMember
                  </li>
                  <li>
                    Giảm ngay 200K khi mua {item.name} (không áp dụng cùng giảm
                    giá qua galaxy gift, xem chi tiết sản phẩm và điều kiện áp
                    dụng tại đây)
                  </li>
                  <li>Liên hệ hotline 1800.2097 để được GIÁ ĐẶC BIỆT</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  if (!cart.length)
    return (
      <div className="flex flex-col justify-center items-center py-[100px]">
        <Image
          width={262}
          height={197}
          alt="Cart-empty"
          src="/images/default/Cart-empty.webp"
        />
        <div className="text-center w-[310px] my-4">
          Giỏ hàng của bạn đang trống. <br /> Hãy chọn thêm sản phẩm để mua sắm
          nhé
        </div>
      </div>
    );
  if (isLoading)
    return (
      <ul className=" flex flex-col gap-[20px] mb-[100px]">
        <CartSkeleton />
      </ul>
    );
}
