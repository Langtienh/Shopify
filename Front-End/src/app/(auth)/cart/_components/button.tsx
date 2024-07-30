"use client";

import { converPriceToVN } from "@/lib/ultils";
import {
  useDeleteCartItemMutation,
  useAddQuantityMutation,
  useSubQuantityMutation,
  useDeleteListItemMutation,
} from "@/redux/cart/services";
import { checkedTogger, toPayment, uncheckedAll } from "@/redux/cart/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

export function DeleteItemBTN({ id }: { id: number }) {
  const [deleteItem, { isLoading }] = useDeleteCartItemMutation();
  const dispath = useAppDispatch();
  const handleClick = () => {
    deleteItem(id);
    dispath(checkedTogger({ checked: false, id }));
  };
  return (
    <Button
      loading={isLoading}
      onClick={handleClick}
      type="text"
      icon={<AiFillDelete size={20} />}
    />
  );
}

export function AddItemBTN({ cartItem }: { cartItem: CartItemResponse }) {
  const [addQuantity, { isLoading }] = useAddQuantityMutation();
  const handleClick = () => {
    addQuantity({ id: cartItem.id, quantity: cartItem.quantity });
  };
  return (
    <Button loading={isLoading} onClick={handleClick} icon={<IoIosAdd />} />
  );
}

export function SubItemBTN({
  cartItem,
  disabled,
}: {
  cartItem: CartItemResponse;
  disabled?: boolean;
}) {
  const [subQuantity, { isLoading }] = useSubQuantityMutation();
  const handleClick = () => {
    subQuantity({ id: cartItem.id, quantity: cartItem.quantity });
  };
  return (
    <Button
      disabled={disabled}
      loading={isLoading}
      onClick={handleClick}
      icon={<RiSubtractFill />}
    />
  );
}

export const ClearListBtn = ({ disabled }: { disabled?: boolean }) => {
  const [deleteList, { isLoading }] = useDeleteListItemMutation();
  const checked = useAppSelector((state) => state.cart.checked);
  const dispath = useAppDispatch();
  const deletelist = () => {
    deleteList(checked);
    dispath(uncheckedAll());
  };
  return (
    <Button loading={isLoading} type="text">
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
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const dispath = useAppDispatch();
  const router = useRouter();
  const handleClick = () => {
    dispath(toPayment());
    router.push("/cart/payment-info");
  };
  return (
    <div className="w-full px-[10px] fixed z-10 top-full left-0 -translate-y-full">
      <div className="border  bg-white flex justify-between items-center p-[10px] pb-4 w-full max-w-[600px] mx-auto rounded-t-lg shadow-xl">
        <div>
          <p>
            Tạm tính:{" "}
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
