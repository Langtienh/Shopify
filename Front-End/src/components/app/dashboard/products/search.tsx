"use client";
import { Input } from "antd";
import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { IoSearch } from "react-icons/io5";

export default function Search({ value }: { value?: string }) {
  const _value = value?.replace("name:", "");
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) params.set("search", `name:${value}`);
      else params.delete("search");
      params.set("page", "1");
      replace(`${patchName}?${params}`, { scroll: false });
    }, 500)
  );
  return (
    <Input
      defaultValue={_value}
      onChange={(e) => debounceRef.current(e.target.value)}
      placeholder="Tìm kiếm"
      allowClear
      prefix={<IoSearch />}
    />
  );
}
