"use client";

import { getAttributesByCategory } from "@/actions/product.services";
import { Button, Tooltip } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductFilter({ category }: { category: string }) {
  const [filters, setFilters] = useState<AttibulteResponse[]>([]);
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getAttributesByCategory(category);
        setFilters(data);
        console.log(data);
      } catch {
        setFilters([]);
      }
    };
    fetchFilters();
  }, [category]);
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const onChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", name);
    replace(`${patchName}?${params}`);
  };
  const onDelete = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("filter");
    replace(`${patchName}?${params}`);
  };
  // const;
  return (
    <div className="flex gap-3">
      {!!filters.length &&
        filters.map((item) => (
          <Tooltip
            key={item.name}
            title={
              <div className="flex flex-wrap gap-2 w-[250px]">
                {!!item.values.length &&
                  item.values.map((value) => (
                    <Button key={value}>{value}</Button>
                  ))}
              </div>
            }
            placement="bottom"
            color="#fff"
          >
            <Button>{item.name}</Button>
          </Tooltip>
        ))}
    </div>
  );
}
