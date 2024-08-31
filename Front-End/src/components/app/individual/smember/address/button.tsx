"use client";

import useAction from "@/hooks/useAction";
import { deleteAddress } from "@/services/address";
import { setAddressDefault } from "@/services/address/action";
import { Button } from "antd";

export const EditAddressButton = ({ address }: { address: Address }) => {
  const [data, isPending, _setAddressDefault] = useAction(setAddressDefault);
  return (
    <Button
      onClick={() => _setAddressDefault(address)}
      loading={isPending}
      type="primary"
    >
      Đặt làm mặc định
    </Button>
  );
};

export const DeleteAddressButton = ({ addressId }: { addressId: number }) => {
  const [data, isPending, _deleteAddress] = useAction(deleteAddress);
  return (
    <Button
      onClick={() => deleteAddress(addressId)}
      className="ml-auto"
      loading={isPending}
      danger
    >
      Xóa
    </Button>
  );
};
