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
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

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
        className="text-red-600 hover:text-red-500 font-bold"
        variant="link"
      >
        Sửa
      </Button>
    </>
  );
};

export const DelProduct = ({ productId }: { productId: number }) => {
  return (
    <>
      <Button
        className="text-blue-600 hover:text-blue-500 font-bold"
        variant="link"
      >
        Xóa
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
