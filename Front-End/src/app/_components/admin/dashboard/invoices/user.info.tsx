import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { MdAccessTime, MdMarkEmailUnread } from "react-icons/md";

export default function UseInfo({ order }: { order: OrderType }) {
  return (
    <div className="max-w-[800px]">
      <h2 className="mb-3 font-bold text-xl">Thông tin đặt hàng</h2>
      <ul className="bg-white rounded-xl shadow-xl p-3 flex flex-col gap-2">
        <li className="flex items-center justify-between">
          <span className="text-gray-400 flex gap-3 items-center">
            <FaUser size={20} />
            <span>Người đặt hàng:</span>
          </span>
          <span className="capitalize">{order.fullName}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-gray-400 flex gap-3 items-center">
            <FaPhone size={20} />
            Số điện thoại:
          </span>
          <span>{order.phone}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-gray-400 flex gap-3 items-center">
            <MdMarkEmailUnread size={20} />
            <span>Email:</span>
          </span>
          <span>{order.email}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-gray-400 flex gap-3 items-center">
            <MdAccessTime size={20} />
            <span>Ngày đặt hàng:</span>
          </span>
          <span>{order.orderDate}</span>
        </li>
        <li className="flex items-start justify-between gap-5">
          <span className="text-gray-400 flex gap-3 items-center text-nowrap">
            <FaMapMarkerAlt size={20} />
            <span>Địa chỉ nhận hàng:</span>
          </span>
          <span className="text-end">{order.address}</span>
        </li>
      </ul>
    </div>
  );
}
