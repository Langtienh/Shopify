"use client";

import { Button, Tooltip } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

type Filter = {
  filterName: string;
  filterSlug: string;
  filterLabel: string;
  value: string;
  valueSlug: string;
};
export default function ProductFilterClient({
  filters,
}: {
  filters: AttibulteResponse[];
}) {
  const [filterValues, setFilterValues] = useState<Filter[]>([]);
  const onAdd = (filter: Filter) => {
    setFilterValues((pre) => [...pre, filter]);
  };
  const handleChangeValue = (
    index: number,
    newValue: string,
    newValueSlug: string
  ) => {
    setFilterValues((pre) => {
      let newObj = pre[index];
      let newState = pre.filter(
        (item) => item.filterName !== newObj.filterName
      );
      newObj = {
        ...newObj,
        value: newValue,
        valueSlug: newValueSlug,
      };
      newState = [...newState, newObj];
      return newState;
    });
  };
  const handleDeleteOneFilter = (filterName: string) => {
    setFilterValues((pre) =>
      pre.filter((item) => item.filterName !== filterName)
    );
  };
  const handleClearFillter = () => setFilterValues([]);
  const isActive = (filterName: string) => {
    const index = filterValues.findIndex(
      (item) => item.filterName === filterName
    );
    return index !== -1;
  };
  const handleAddFilter = (filter: Filter) => {
    const index = filterValues.findIndex(
      (item) => item.filterName === filter.filterName
    );
    if (index !== -1) {
      const objFilter = filterValues[index];
      if (objFilter.value === filter.filterName)
        handleDeleteOneFilter(filter.filterName);
      else handleChangeValue(index, filter.value, filter.valueSlug);
    } else onAdd(filter);
  };

  // set searchparam
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    let query = "";
    filterValues.forEach((item) => {
      query += `${item.filterSlug}:${item.valueSlug},`;
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
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex gap-3">
          {!!filters.length &&
            filters.map((filter) => (
              <Tooltip
                key={filter.name}
                title={
                  <div className="flex flex-wrap gap-2 w-[250px]">
                    {!!filter.values.length &&
                      filter.values.map((item) => (
                        <Button
                          className="capitalize"
                          onClick={() =>
                            handleAddFilter({
                              filterName: filter.name,
                              filterSlug: filter.slug,
                              filterLabel: filter.label,
                              value: item.value,
                              valueSlug: item.slug,
                            })
                          }
                          key={item.slug}
                        >
                          {item.value}
                        </Button>
                      ))}
                  </div>
                }
                placement="bottom"
                color="#fff"
              >
                <Button
                  className="capitalize"
                  danger={isActive(filter.name)}
                  onClick={() => handleDeleteOneFilter(filter.name)}
                >
                  {filter.label}
                </Button>
              </Tooltip>
            ))}
        </div>
      </div>

      {!!filterValues.length && (
        <>
          <h2 className="text-lg font-bold ">Đang lọc theo</h2>
          <div className="w-full overflow-auto no-scrollbar">
            <div className="flex gap-3">
              {filterValues.map((filter) => (
                <Button
                  className="capitalize"
                  danger
                  icon={<IoIosCloseCircle />}
                  onClick={() => handleDeleteOneFilter(filter.filterName)}
                  key={`${filter.filterName}:${filter.value}`}
                >{`${filter.filterLabel}: ${filter.value}`}</Button>
              ))}
              <Button danger onClick={handleClearFillter}>
                Bỏ chọn tất cả
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
