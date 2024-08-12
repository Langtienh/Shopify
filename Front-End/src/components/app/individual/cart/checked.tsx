"use client";

import { Checkbox } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type Props = {
  indeterminate: boolean;
  checkAll: boolean;
  listId: number[];
};
export const CheckAll = ({ indeterminate, checkAll, listId }: Props) => {
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const onChangeAll = () => {
    const params = new URLSearchParams(searchParams);
    if (checkAll) params.delete("checkList");
    else params.set("checkList", listId.toString());
    replace(`${patchName}?${params}`, { scroll: false });
  };
  return (
    <Checkbox
      indeterminate={indeterminate}
      checked={checkAll}
      onChange={onChangeAll}
    >
      <div className="text-base">Chọn tất cả</div>
    </Checkbox>
  );
};

export const CheckItem = ({
  id,
  checkList,
}: {
  id: number;
  checkList: number[];
}) => {
  const isChecked = checkList.includes(id);
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const changeCheckBox = () => {
    let _checkList = [...checkList];
    const params = new URLSearchParams(searchParams);
    if (isChecked) _checkList = _checkList.filter((item) => item !== id);
    else _checkList.push(id);
    if (_checkList.length) params.set("checkList", _checkList.toString());
    else params.delete("checkList");
    replace(`${patchName}?${params}`, { scroll: false });
  };
  return (
    <Checkbox
      onChange={changeCheckBox}
      className="mb-auto"
      checked={isChecked}
    />
  );
};
