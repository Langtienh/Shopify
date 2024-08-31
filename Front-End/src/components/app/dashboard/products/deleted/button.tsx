"use client";

import useAction from "@/hooks/useAction";
import { updateProductStasus } from "@/services/product/action";
import { Button } from "antd";
import { MdRestore } from "react-icons/md";

export const RestoreProductButton = ({ productId }: { productId: number }) => {
  const [response, isPending, _updateProductStasus] =
    useAction(updateProductStasus);
  const handleDeleteComment = async () => {
    await _updateProductStasus(productId, true);
  };
  return (
    <Button
      onClick={handleDeleteComment}
      loading={isPending}
      size="small"
      danger
      icon={<MdRestore size={20} />}
    />
  );
};
