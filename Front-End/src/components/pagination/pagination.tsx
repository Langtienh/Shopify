"use client";

import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type TProps = {
  current?: number;
  pageSize?: number;
  total: number;
};
export default function MyPagination({
  current = 1,
  pageSize = 10,
  total,
}: TProps) {
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const onChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("limit", pageSize.toString());
    replace(`${patchName}?${params}`);
  };
  return (
    <div className="flex justify-center">
      <Pagination
        onChange={onChange}
        pageSize={pageSize}
        current={current}
        total={total}
      />
    </div>
  );
}
