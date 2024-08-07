"use client";

import RenderIf from "@/components/renderif";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { RiDeleteBin6Line, RiSubtractFill } from "react-icons/ri";

export const AddProduct = () => {
  return (
    <>
      <Button>Thêm</Button>
    </>
  );
};
export const EditProduct = ({ product }: { product: ProductResponse }) => {
  return (
    <>
      <Button
        className="text-blue-600 hover:text-blue-500 size-6"
        variant="ghost"
        size="icon"
        // onClick={() => setEdit(true)}
      >
        <CiEdit size={20} />
      </Button>
    </>
  );
};

export const DelProduct = ({ productId }: { productId: number }) => {
  const handleChange = () => {};
  return (
    <>
      <Button
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
