"use client";
import { Button } from "@/components/ui/button";
import { Badge, Select } from "antd";
import Link from "next/link";
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
      <span className="basis-[135px]">
        {edit ? (
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
        ) : (
          <Badge status={statusColor[_status]} text={_status} />
        )}
      </span>

      {edit ? (
        <Button size="sm" className="ml-3" disabled={loading} onClick={submit}>
          Gửi
        </Button>
      ) : (
        <Button
          className="text-red-600 hover:text-red-500 font-bold"
          variant="link"
          onClick={() => setEdit(true)}
        >
          Thay đổi
        </Button>
      )}
    </>
  );
};

export const View = ({ id }: { id: string | number }) => {
  return (
    <Link href={`/dashboard/invoices/${id}`}>
      <Button
        className="text-blue-600 hover:text-blue-500 font-bold"
        variant="link"
      >
        Xem chi tiết
      </Button>
    </Link>
  );
};
