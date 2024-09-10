"use client";

import { useAuth } from "@/contexts/auth.context";
import useAction from "@/hooks/useAction";
import { updateProductStasus } from "@/services/product/action";
import { Button, message } from "antd";
import { MdRestore } from "react-icons/md";

export const RestoreProductButton = ({ productId }: { productId: number }) => {
  const [response, isPending, _updateProductStasus] =
    useAction(updateProductStasus);
  const auth = useAuth();
  const isDemo = !!auth.user?.roles.includes("demo");
  const handleDeleteComment = async () => {
    if (isDemo) message.warning("Chỉ được phép xem");
    else await _updateProductStasus(productId, true);
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
