"use client";

import useAction from "@/hooks/useAction";
import { converPriceToVN } from "@/lib/utils2";
import { updateTotalPrice } from "@/redux/checkout/slice";

import { useAppDispatch } from "@/redux/store";
import {
  addQuantity,
  deleteCartItem,
  deleteListItem,
  subQuantity,
} from "@/services/cart";
import { Button, message } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

export function DeleteItemBTN({
  id,
  checkList,
}: {
  id: number;
  checkList: number[];
}) {
  const [response, isPending, _deleteCartItem] = useAction(deleteCartItem);
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const handleDelCartItem = async () => {
    const res = await _deleteCartItem(id);
    if (res) {
      message.success(res.message);
      const params = new URLSearchParams(searchParams);
      const _checkList = checkList.filter((item) => item !== id);
      if (_checkList.length) params.set("checkList", _checkList.toString());
      else params.delete("checkList");
      replace(`${patchName}?${params}`, { scroll: false });
    }
  };
  return (
    <Button
      loading={isPending}
      onClick={handleDelCartItem}
      type="text"
      icon={<AiFillDelete size={20} />}
    />
  );
}

export function AddItemBTN({ cartItem }: { cartItem: CartItemResponse }) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleAddCartItem = async () => {
    if (cartItem.stock < cartItem.quantity + 1)
      message.error("Hết hàng, vui lòng iên hệ với quản trị viên để mua thêm");
    setLoading(true);
    await addQuantity(cartItem.id, cartItem.quantity);
    setLoading(false);
  };
  return (
    <Button
      loading={isLoading}
      onClick={handleAddCartItem}
      icon={<IoIosAdd />}
    />
  );
}

export function SubItemBTN({
  cartItem,
  disabled,
}: {
  cartItem: CartItemResponse;
  disabled: boolean;
}) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubQuantity = async () => {
    setLoading(true);
    try {
      await subQuantity(cartItem.id, cartItem.quantity);
    } catch {}
    setLoading(false);
  };
  return (
    <Button
      disabled={disabled}
      loading={isLoading}
      onClick={handleSubQuantity}
      icon={<RiSubtractFill />}
    />
  );
}

export const ClearListBtn = ({ checkList }: { checkList: number[] }) => {
  const [response, isPending, _deleteListItem] = useAction(deleteListItem);
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const handledDeletelist = async () => {
    const res = await _deleteListItem(checkList);
    if (res) {
      const params = new URLSearchParams(searchParams);
      params.delete("checkList");
      replace(`${patchName}?${params}`, { scroll: false });
    }
  };
  return (
    <Button loading={isPending} type="text">
      <p
        onClick={handledDeletelist}
        className="cursor-pointer text-gray-400 text-sm italic font-semibold"
      >
        Xóa sản phẩm đã chọn
      </p>
    </Button>
  );
};

export function BuyBtn({
  totalPrice,
  checkList,
}: {
  totalPrice: number;
  checkList: number[];
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = () => {
    dispatch(updateTotalPrice(totalPrice));
    router.push(`/cart/payment-info?checkout=${checkList.toString()}`);
  };
  return (
    <div className="w-full px-[10px] fixed z-10 top-full left-0 -translate-y-full">
      <div className="border  bg-white flex justify-between items-center p-[10px] pb-4 w-full max-w-[600px] mx-auto rounded-t-lg shadow-xl">
        <div>
          <p>
            Tạm tính:
            <span className="text-red-600 font-bold">
              {converPriceToVN(totalPrice, "đ")}
            </span>
          </p>
          <p className="text-[12px] text-gray-500">
            Chưa gồm chiết khấu SMember
          </p>
        </div>
        <Button
          onClick={handleClick}
          disabled={!totalPrice}
          size="large"
          type="primary"
          danger
        >
          Mua ngay
        </Button>
      </div>
    </div>
  );
}
