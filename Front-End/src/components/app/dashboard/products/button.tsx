"use client";

import RenderIf from "@/components/global/renderif";
import { Button } from "@/components/ui/button";
import useAction from "@/hooks/useAction";
import { updateProductStasus } from "@/services/product/action";

import { message, Select } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { RiDeleteBin6Line, RiSubtractFill } from "react-icons/ri";

export const AddProduct = () => {
  return (
    <>
      <Link href="/dashboard/products/create">
        <Button>Thêm</Button>
      </Link>
    </>
  );
};
export const EditProduct = ({ productId }: { productId: number }) => {
  return (
    <>
      <Link href={`/dashboard/products/${productId}/edit`}>
        <Button
          className="text-blue-600 hover:text-blue-500 size-6"
          variant="ghost"
          size="icon"
        >
          <CiEdit size={20} />
        </Button>
      </Link>
    </>
  );
};

export const DelProduct = ({
  productId,
  isDemo,
  isActive,
}: {
  productId: number;
  isDemo?: boolean;
  isActive: boolean;
}) => {
  const [response, isPending, _updateProductStasus] =
    useAction(updateProductStasus);
  const handleChange = async () => {
    if (isDemo) {
      message.warning("Chỉ được phép xem");
    } else await _updateProductStasus(productId, !isActive);
  };
  return (
    <>
      <Button
        disabled={isPending}
        className="text-red-600 hover:text-red-500 size-6"
        variant="ghost"
        size="icon"
        onClick={handleChange}
      >
        <RiDeleteBin6Line size={16} />
      </Button>
    </>
  );
};

export const ViewDetailToggle = ({
  isShow,
  toggle,
}: {
  isShow: boolean;
  toggle: (value: boolean) => void;
}) => {
  return (
    <>
      <RenderIf renderIf={isShow}>
        <Button
          className="size-5 border-blue-600 hover:border-blue-500"
          variant="outline"
          size="icon"
          onClick={() => toggle(isShow)}
        >
          <IoIosAdd />
        </Button>
      </RenderIf>
      <RenderIf renderIf={!isShow}>
        <Button
          className="size-5 hover:border-blue-600"
          variant="outline"
          size="icon"
          onClick={() => toggle(isShow)}
        >
          <RiSubtractFill />
        </Button>
      </RenderIf>
    </>
  );
};

export const FilterByCategory = ({
  categories,
  category,
}: {
  categories: CategoryType[];
  category: string | undefined;
}) => {
  const option = categories.map((item) => ({ value: item.name }));
  option.push({ value: "Xem tất cả" });
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const onChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "Xem tất cả") params.delete("category");
    else params.set("category", category);
    replace(`${patchName}?${params}`, { scroll: false });
  };
  return (
    <Select
      value={category}
      style={{ width: 170 }}
      onChange={onChange}
      placeholder="Danh mục"
      options={option}
    ></Select>
  );
};
