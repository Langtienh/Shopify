"use client";

import {
  useDeleteCartItemMutation,
  useAddQuantityMutation,
  useSubQuantityMutation,
  useDeleteListItemMutation,
} from "@/redux/cart/services";
import { checkedTogger, uncheckedAll } from "@/redux/cart/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

export function DeleteItemBTN({
  id,
  disabled,
}: {
  id: number;
  disabled?: boolean;
}) {
  const [deleteItem] = useDeleteCartItemMutation();
  const dispath = useAppDispatch();
  const handleClick = () => {
    deleteItem(id);
    dispath(checkedTogger({ checked: false, id }));
  };
  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      type="text"
      icon={<AiFillDelete size={20} />}
    />
  );
}

export function AddItemBTN({
  id,
  disabled,
}: {
  id: number;
  disabled?: boolean;
}) {
  const [addQuantity] = useAddQuantityMutation();
  const handleClick = () => {
    addQuantity(id);
  };
  return (
    <Button disabled={disabled} onClick={handleClick} icon={<IoIosAdd />} />
  );
}

export function SubItemBTN({
  id,
  disabled,
}: {
  id: number;
  disabled?: boolean;
}) {
  const [subQuantity] = useSubQuantityMutation();
  const handleClick = () => {
    subQuantity(id);
  };
  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      icon={<RiSubtractFill />}
    />
  );
}

export const ClearListBtn = ({ disabled }: { disabled?: boolean }) => {
  const [deleteList] = useDeleteListItemMutation();
  const checked = useAppSelector((state) => state.cart.checked);
  const dispath = useAppDispatch();
  const deletelist = () => {
    deleteList(checked);
    dispath(uncheckedAll());
  };
  return (
    <Button disabled={disabled} type="text">
      <p
        onClick={deletelist}
        className="cursor-pointer text-gray-400 text-sm italic font-semibold"
      >
        Xóa sản phẩm đã chọn
      </p>
    </Button>
  );
};

export function BuyBtn() {
  const checked = useAppSelector((state) => state.cart.checked);
  return (
    <div className="w-full px-[10px] fixed z-10 top-full left-0 -translate-y-full">
      <div className="border  bg-white flex justify-between items-center p-[10px] pb-4 w-full max-w-[600px] mx-auto rounded-t-lg shadow-xl">
        <div>
          <p>
            Tạm tính: <span className="text-red-600 font-bold">0đ</span>
          </p>
          <p className="text-[12px] text-gray-500">
            Chưa gồm chiết khấu SMember
          </p>
        </div>
        <Button disabled={!checked.length} size="large" type="primary" danger>
          Mua ngay
        </Button>
      </div>
    </div>
  );
}
