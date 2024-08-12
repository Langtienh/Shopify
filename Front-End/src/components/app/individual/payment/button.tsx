"use client";

import { Button } from "@/components/ui/button";
import { openNotification } from "@/lib/nofication";
import { useState } from "react";

export const VoucherButton = () => {
  const [voucher, setVoucher] = useState<string>("");
  const onClick = () => {
    openNotification({
      notificationType: "success",
      message: "Áp dụng thành công",
      description: "",
    });
  };
  return (
    <>
      <input
        onChange={(e) => setVoucher(e.target.value)}
        type="text"
        placeholder="Nhập mã giảm giá (Chỉ áp dụng 1 lần)"
        className="w-full border-b outline-none pt-2 pb-1 flex-1"
      />
      <Button
        className="bg-red-600 hover:bg-red-500"
        onClick={onClick}
        disabled={!voucher}
      >
        Áp dụng
      </Button>
    </>
  );
};
