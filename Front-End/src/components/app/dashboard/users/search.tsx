"use client";
import { Input } from "antd";
import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { IoSearch } from "react-icons/io5";

export default function Search() {
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("name", `${value}`);
      replace(`${patchName}?${params}`, { scroll: false });
    }, 300)
  );
  return (
    <Input
      onChange={(e) => debounceRef.current(e.target.value)}
      placeholder="Tìm kiếm"
      allowClear
      prefix={<IoSearch />}
    />
  );
}
