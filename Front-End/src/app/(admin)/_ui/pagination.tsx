"use client";
import { Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const optionsPagesize = [
  { value: 5, label: "5 Item" },
  { value: 10, label: "10 Item" },
  { value: 15, label: "15 Item" },
  { value: 20, label: "20 Item" },
];

export const OptionPageSize = ({ limit }: { limit: number }) => {
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const onChange = (pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", pageSize.toString());
    replace(`${patchName}?${params}`);
  };
  return (
    <Select
      defaultValue={limit}
      style={{ width: 120 }}
      onChange={onChange}
      options={optionsPagesize}
    />
  );
};
