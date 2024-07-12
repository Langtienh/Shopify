import Link from "next/link";
import { FaShopify } from "react-icons/fa";

export const Cart = () => {
  return (
    <Link href="/cart">
      <div className="flex flex-col md:flex-row gap-1 items-center">
        <FaShopify size={30} />
        <div className="text-[12px] hidden md:block">
          <p>Giỏ</p>
          <p>hàng</p>
        </div>
      </div>
    </Link>
  );
};
