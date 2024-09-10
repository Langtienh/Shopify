"use client";
import RenderIf from "@/components/global/renderif";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import useAction from "@/hooks/useAction";
import { delBrand } from "@/services/brand";
import { delCategory } from "@/services/category";
import { updateStatusPaymentMethod } from "@/services/payment-method";
import { message } from "antd";
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export const DelCategoryButton = ({ categoryId }: { categoryId: number }) => {
  const [response, isPending, _delCategory] = useAction(delCategory);
  const auth = useAuth();
  const isDemo = !!auth.user?.roles.includes("demo");
  const handleDelete = async () => {
    if (isDemo) message.warning("Chỉ được phép xem");
    else await _delCategory(categoryId);
  };
  return (
    <Button onClick={handleDelete} variant="ghost" size="icon">
      <MdDeleteOutline size={20} />
    </Button>
  );
};

export const DelBrandButton = ({ brandId }: { brandId: number }) => {
  const [response, isPending, _delBrand] = useAction(delBrand);
  const auth = useAuth();
  const isDemo = !!auth.user?.roles.includes("demo");
  const handleDelete = async () => {
    if (isDemo) message.warning("Chỉ được phép xem");
    else await _delBrand(brandId);
  };
  return (
    <Button onClick={handleDelete} variant="ghost" size="icon">
      <MdDeleteOutline size={20} />
    </Button>
  );
};

export const UpdateMethodStatusButton = ({
  paymenMethodId,
  status,
}: {
  paymenMethodId: number;
  status: boolean;
}) => {
  const [reponse, isPending, _updateStatusPaymentMethod] = useAction(
    updateStatusPaymentMethod
  );
  const auth = useAuth();
  const isDemo = !!auth.user?.roles.includes("demo");
  const handleDelete = async () => {
    if (isDemo) message.warning("Chỉ được phép xem");
    else await _updateStatusPaymentMethod(!status, paymenMethodId);
  };
  return (
    <>
      <Button
        onClick={handleDelete}
        disabled={isPending}
        variant="ghost"
        size="icon"
      >
        <RenderIf renderIf={status}>
          <FaUnlock size={18} />
        </RenderIf>
        <RenderIf renderIf={!status}>
          <FaLock size={18} />
        </RenderIf>
      </Button>
    </>
  );
};
