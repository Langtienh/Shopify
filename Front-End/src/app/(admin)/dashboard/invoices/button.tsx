"use client";
import { Button } from "@/components/ui/button";
import { Badge, Select } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const options = [
  { value: "PENDING" },
  { value: "DELIVERED" },
  { value: "CANCELLED" },
  { value: "PROCESSING" },
  { value: "SHIPPED" },
];
type badgeStatus = "warning" | "error" | "processing" | "default" | "success";
const statusColor: Record<OrderStatus, badgeStatus> = {
  PENDING: "warning",
  DELIVERED: "success",
  CANCELLED: "error",
  PROCESSING: "processing",
  SHIPPED: "default",
};

export const EditStatus = ({
  status,
  id,
}: {
  status: OrderStatus;
  id: string;
}) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_status, setStatus] = useState<OrderStatus>("PENDING");
  useEffect(() => setStatus(status), [status]);
  const handleChange = (values: OrderStatus) => setStatus(values);
  const submit = async () => {
    // setLoading(true)
    // await
    // setLoading(false)
    setEdit(false);
  };
  return (
    <>
      <Badge
        status={statusColor[_status]}
        text={
          <Select
            disabled={!edit}
            value={_status}
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
          />
        }
      />
      {edit ? (
        <Button disabled={loading} onClick={submit}>
          Submit
        </Button>
      ) : (
        <Button onClick={() => setEdit(true)}>Change</Button>
      )}
    </>
  );
};

export const View = ({ id }: { id: string | number }) => {
  return (
    <Link href={`/dashboard/invoices/${id}`}>
      <Button
        // onClick={}
        className="bg-blue-600 hover:bg-blue-500"
      >
        Xem chi tiết
      </Button>
    </Link>
  );
};

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
