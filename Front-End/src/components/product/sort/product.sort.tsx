"use client";

import { Button } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { HiMiniGift } from "react-icons/hi2";

const sorter: {
  name: string;
  order: string;
  icon: JSX.Element;
  label: string;
}[] = [
  {
    name: "price",
    order: ":desc",
    icon: <FaAnglesDown />,
    label: "Giá Cao-Thấp",
  },
  {
    name: "price",
    order: ":asc",
    icon: <FaAnglesUp />,
    label: "Giá Thấp-Cao",
  },
  {
    name: "discount",
    order: ":desc",
    icon: <HiMiniGift />,
    label: "Khuyễn mãi hot",
  },
  { name: "viewCount", order: ":desc", icon: <GrView />, label: "Xem nhiều" },
];
export default function ProductSort() {
  const [sortActive, setSortActive] = useState<number>(-1);
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const onDelete = () => {
    setSortActive(-1);
    const params = new URLSearchParams(searchParams);
    params.delete("sort");
    replace(`${patchName}?${params}`);
  };
  const onSet = (name: string, index: number) => {
    setSortActive(index);
    const params = new URLSearchParams(searchParams);
    params.set("sort", name);
    replace(`${patchName}?${params}`);
  };
  const onChange = (name: string, index: number) => {
    if (index == sortActive) onDelete();
    else onSet(name, index);
  };

  return (
    <>
      <h2 className="text-lg font-bold ">Sắp xếp theo</h2>
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex gap-3">
          {sorter.map((item, index) => (
            <Button
              onClick={() => onChange(`${item.name}${item.order}`, index)}
              danger={index === sortActive}
              icon={item.icon}
              key={index}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
