"use client";
import RenderIf from "@/components/global/renderif";
import { Button } from "@/components/ui/button";
import useAction from "@/hooks/useAction";
import { delBrand } from "@/services/brand";
import { delCategory } from "@/services/category";
import { updateStatusPaymentMethod } from "@/services/payment-method";
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export const DelCategoryButton = ({ categoryId }: { categoryId: number }) => {
  const [response, isPending, _delCategory] = useAction(delCategory);
  return (
    <Button
      onClick={() => _delCategory(categoryId)}
      variant="ghost"
      size="icon"
    >
      <MdDeleteOutline size={20} />
    </Button>
  );
};

export const DelBrandButton = ({ brandId }: { brandId: number }) => {
  const [response, isPending, _delBrand] = useAction(delBrand);
  return (
    <Button onClick={() => _delBrand(brandId)} variant="ghost" size="icon">
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
  return (
    <>
      <Button
        onClick={() => updateStatusPaymentMethod(!status, paymenMethodId)}
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
