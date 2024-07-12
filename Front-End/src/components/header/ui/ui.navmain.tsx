import Link from "next/link";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiMapPinThin, PiPhoneThin } from "react-icons/pi";

const nav = [
  {
    icon: <PiPhoneThin size={34} />,
    label: (
      <p className="text-[12px]">
        Gọi mua hàng <br />
        1800.2044
      </p>
    ),
    link: "/contact",
  },
  {
    icon: <PiMapPinThin size={34} />,
    label: (
      <p className="text-[12px]">
        Của hàng <br />
        gần bạn
      </p>
    ),
    link: "/shop",
  },
  {
    icon: <CiDeliveryTruck size={34} />,
    label: (
      <p className="text-[12px]">
        Tra cứu <br />
        Đơn hàng
      </p>
    ),
    link: "/invoice",
  },
];

export const Nav = () => {
  return (
    <>
      {nav.map((item, index) => (
        <Link className="hidden lg:block" href={item.link} key={index}>
          <div className="flex gap-1">
            {item.icon}
            {item.label}
          </div>
        </Link>
      ))}
    </>
  );
};
