"use client";

import useAction from "@/hooks/useAction";
import { deleteAddress } from "@/services/address";
import { setAddressDefault } from "@/services/address/action";
import { Button } from "antd";

export const EditAddressButton = ({ address }: { address: Address }) => {
  const [data, isPending, _setAddressDefault] = useAction(setAddressDefault);
  return (
    <span onClick={() => _setAddressDefault(address)}>Đặt làm mặc định</span>
  );
};

export const DeleteAddressButton = ({ addressId }: { addressId: number }) => {
  const [data, isPending, _deleteAddress] = useAction(deleteAddress);
  return <span onClick={() => deleteAddress(addressId)}>Xóa</span>;
};
