"use client";

import { Button, Tooltip } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default function ProductFilter({
  filters,
}: {
  filters: AttibulteResponse[];
}) {
  const [filterValues, setFilterValues] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);
  const onAdd = (name: string, value: string) => {
    setFilterValues((pre) => [...pre, { name, value }]);
  };
  const onChange = (newValue: string, index: number) => {
    setFilterValues((pre) => {
      let newObj = pre[index];
      let newState = pre.filter((item) => item.name !== newObj.name);
      newObj = { name: newObj.name, value: newValue };
      newState = [...newState, newObj];
      return newState;
    });
  };
  const onDelete = (name: string) => {
    setFilterValues((pre) => pre.filter((item) => item.name !== name));
  };
  const onDeleteAll = () => setFilterValues([]);
  const checkActive = (name: string) => {
    const index = filterValues.findIndex((item) => item.name === name);
    return index !== -1;
  };
  const onClick = (name: string, value: string) => {
    const index = filterValues.findIndex((item) => item.name === name);
    if (index !== -1) {
      const objFilter = filterValues[index];
      if (objFilter.value === value) onDelete(name);
      else onChange(value, index);
    } else onAdd(name, value);
  };

  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    let query = "";
    filterValues.forEach((item) => {
      query += `${item.name}:${item.value},`;
    });
    query = query.slice(0, -1);
    const params = new URLSearchParams(searchParams);
    if (!!query) params.set("filters", query);
    else params.delete("filters");
    replace(`${patchName}?${params}`);
  }, [filterValues, searchParams, replace, patchName]);
  return (
    <>
      <h2 className="text-lg font-bold ">Chọn theo tiêu chí</h2>
      <div className="flex gap-3">
        {!!filters.length &&
          filters.map((item) => (
            <Tooltip
              key={item.name}
              title={
                <div className="flex flex-wrap gap-2 w-[250px]">
                  {!!item.values.length &&
                    item.values.map((value) => (
                      <Button
                        onClick={() => onClick(item.name, value)}
                        key={value}
                      >
                        {value}
                      </Button>
                    ))}
                </div>
              }
              placement="bottom"
              color="#fff"
            >
              <Button
                danger={checkActive(item.name)}
                onClick={() => onDelete(item.name)}
              >
                {item.name}
              </Button>
            </Tooltip>
          ))}
      </div>

      {!!filterValues.length && (
        <>
          <h2 className="text-lg font-bold ">Đang lọc theo</h2>
          <div className="flex gap-3">
            {filterValues.map((item) => (
              <Button
                danger
                icon={<IoIosCloseCircle />}
                onClick={() => onDelete(item.name)}
                key={`${item.name}:${item.value}`}
              >{`${item.name}: ${item.value}`}</Button>
            ))}
            <Button danger onClick={onDeleteAll}>
              Bỏ chọn tất cả
            </Button>
          </div>
        </>
      )}
    </>
  );
}
