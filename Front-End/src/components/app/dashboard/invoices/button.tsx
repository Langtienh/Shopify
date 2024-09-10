"use client";
import RenderIf from "@/components/global/renderif";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import useAction from "@/hooks/useAction";
import { updateInvoiceStatus } from "@/services/invoice";
import { Badge, message, Select } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
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
  const auth = useAuth();
  const isDemo = !!auth.user?.roles.includes("demo");
  const [edit, setEdit] = useState(false);
  const [response, isPending, _updateInvoiceStatus] =
    useAction(updateInvoiceStatus);
  const [_status, setStatus] = useState<OrderStatus>("PENDING");
  useEffect(() => setStatus(status), [status]);
  const handleChange = (values: OrderStatus) => setStatus(values);
  const submit = async () => {
    if (isDemo) {
      message.warning("Chỉ được phép xem");
    } else {
      await _updateInvoiceStatus(id, _status);
      setEdit(false);
    }
  };
  return (
    <div className="flex items-center">
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
        <Button size="sm" className="ml-3" onClick={submit}>
          <RenderIf renderIf={isPending}>
            <AiOutlineLoading className="mr-2 size-[14px] animate-spin" />
          </RenderIf>
          Gửi
        </Button>
      ) : (
        <Button
          className="text-red-600 hover:text-red-500 size-6"
          variant="ghost"
          size="icon"
          onClick={() => setEdit(true)}
        >
          <CiEdit size={18} />
        </Button>
      )}
    </div>
  );
};

export const View = ({ id }: { id: string | number }) => {
  return (
    <Link
      href={`/dashboard/invoices/${id}`}
      className="text-blue-600 hover:text-blue-500 font-bold py-0"
    >
      Xem chi tiết
    </Link>
  );
};
