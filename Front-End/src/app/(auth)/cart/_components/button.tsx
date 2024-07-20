"use client";

import {
  useDeleteCartItemMutation,
  useAddQuantityMutation,
  useSubQuantityMutation,
  useDeleteListItemMutation,
} from "@/redux/cart/services";
import { useAppSelector } from "@/redux/store";
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
  const handleClick = () => {
    deleteItem(id);
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

export function BuyBtn() {
  const checked = useAppSelector((state) => state.cart.checked);
  return (
    <Button disabled={!checked.length} size="large" type="primary" danger>
      Mua ngay
    </Button>
  );
}

export const ClearListBtn = ({ disabled }: { disabled?: boolean }) => {
  const [deleteList] = useDeleteListItemMutation();
  const checked = useAppSelector((state) => state.cart.checked);
  return (
    <Button disabled={disabled} type="text">
      <p
        onClick={() => deleteList(checked)}
        className="cursor-pointer text-gray-400 text-sm italic font-semibold"
      >
        Xóa sản phẩm đã chọn
      </p>
    </Button>
  );
};
