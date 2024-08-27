"use client";

import { deleteAddress } from "@/services/address";
import { setAddressDefault } from "@/services/address/action";
import { Button, message } from "antd";
import { useState } from "react";

export const EditAddressButton = ({ address }: { address: Address }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleSetDefault = async () => {
    setLoading(true);
    const res = await setAddressDefault(address);
    if (res.isError) message.error(res.message);
    else message.success(res.message);
    setLoading(false);
  };
  return (
    <Button onClick={handleSetDefault} loading={isLoading} type="primary">
      Đặt làm mặc định
    </Button>
  );
};

export const DeleteAddressButton = ({ addressId }: { addressId: number }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleDeleteAddress = async () => {
    setLoading(true);
    const res = await deleteAddress(addressId);
    if (res.isError) message.error(res.message);
    else message.success(res.message);
    setLoading(false);
  };
  return (
    <Button
      onClick={handleDeleteAddress}
      className="ml-auto"
      loading={isLoading}
      danger
    >
      Xóa
    </Button>
  );
};
