"use client";

import { useDeleteCartMutation, useGetCartQuery } from "@/redux/cart/services";
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
} from "@/app/(auth)/cart/_components/button";
import CartSkeleton from "@/app/(auth)/cart/_components/cart.skeleton";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { checkedAll, checkedTogger } from "@/redux/cart/slice";
import { useEffect, useState } from "react";

export default function Cart() {
  const { data, isFetching, isLoading } = useGetCartQuery();
  const dispath = useAppDispatch();
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const checked = useAppSelector((state) => state.cart.checked);
  useEffect(() => {
    const length = checked.length;
    if (data?.length) {
      setIndeterminate(0 < length && length < data.length);
      setCheckAll(length === data.length);
    }
  }, [checked, data]);
  const changeCheckBox = (e: CheckboxChangeEvent, id: number) => {
    const checked = e.target.checked;
    dispath(checkedTogger({ checked, id }));
  };
  const [listId, setListId] = useState<number[]>([]);
  useEffect(() => {
    if (data?.length) setListId(data.map((item) => item.id));
  }, [data]);
  const onAll = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    dispath(checkedAll({ checked, listId }));
  };
  if (data)
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
          {!!data &&
            data.map((item) => (
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
                            id={item.productId}
                          />
                          <div className="w-10 flex justify-center">
                            <InputNumber readOnly value={item.quantity} />
                          </div>
                          <AddItemBTN
                            id={item.productId}
                            disabled={isFetching}
                          />
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
                      Giảm ngay 200K khi mua {item.name} (không áp dụng cùng
                      giảm giá qua galaxy gift, xem chi tiết sản phẩm và điều
                      kiện áp dụng tại đây)
                    </li>
                    <li>Liên hệ hotline 1800.2097 để được GIÁ ĐẶC BIỆT</li>
                  </ul>
                </div>
              </li>
            ))}
        </ul>
      </>
    );
  if (isLoading)
    return (
      <ul className=" flex flex-col gap-[20px] mb-[100px]">
        <CartSkeleton />
      </ul>
    );
}
