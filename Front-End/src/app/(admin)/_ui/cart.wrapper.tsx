import { FaMoneyBillWave, FaRegUser, FaRegClock } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { fetchCardData } from "@/actions/admin.services";

const iconMap = {
  collected: FaMoneyBillWave,
  customers: FaRegUser,
  pending: FaRegClock,
  invoices: IoDocumentsOutline,
};

export default async function CardWrapper() {
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPendingInvoices,
    totalPaidInvoices,
  } = await fetchCardData();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      <Card title="Tổng thu nhập" value={totalPaidInvoices} type="collected" />
      <Card
        title="Hóa đơn chưa xử lý"
        value={totalPendingInvoices}
        type="pending"
      />
      <Card title="Tổng số hóa đơn" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </div>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-lg border">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
