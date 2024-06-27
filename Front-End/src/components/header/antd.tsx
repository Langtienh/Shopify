"use client";
import type { MenuProps } from "antd";
import { Dropdown, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { CiDeliveryTruck, CiLaptop } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineUserCircle } from "react-icons/hi";
import { IoIosTabletPortrait, IoMdClose } from "react-icons/io";
import { IoWatchOutline } from "react-icons/io5";
import { LuSmartphone, LuTruck } from "react-icons/lu";
import { MdOndemandVideo, MdOutlinePersonalVideo } from "react-icons/md";
import {
  PiMapPinThin,
  PiPhoneThin,
  PiShoppingCartSimpleThin,
} from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const icons = {
  smartphone: <LuSmartphone />,
  laptop: <CiLaptop />,
  tablet: <IoIosTabletPortrait />,
  tivi: <MdOndemandVideo />,
  screen: <MdOutlinePersonalVideo />,
  headphone: <TfiHeadphoneAlt />,
  watch: <IoWatchOutline />,
};

export const MenuDropdown = ({
  category,
  brands,
}: {
  category: string;
  brands: TBrand[];
}) => {
  let items: MenuProps["items"] = brands.map((item: TBrand) => ({
    key: item.id,
    label: <Link href={`/${category}/${item.brand}`}>{item.brand}</Link>,
  }));
  items = [
    { key: 0, label: <Link href={`/${category}`}>Xem tất cả</Link> },
    ...items,
  ];
  type IconKey = keyof typeof icons; // Định nghĩa kiểu cho các key của đối tượng icons

  function getIconNode(key: string): JSX.Element | null {
    // Ép kiểu key về IconKey để kiểm tra tính hợp lệ
    const iconKey = key as IconKey;

    // Kiểm tra xem key có tồn tại trong icons không
    if (icons.hasOwnProperty(iconKey)) {
      return icons[iconKey];
    }

    return null;
  }

  // Sử dụng hàm getIconNode để lấy node icon
  const iconNode = getIconNode(category);

  return (
    <Dropdown menu={{ items }} placement="bottom">
      <span className="h-9 flex gap-2 items-center justify-center flex-1 cursor-pointer uppercase text-[12px] md:text-sm text-white hover:text-white">
        {iconNode}
        {category}
      </span>
    </Dropdown>
  );
};

export const SearchInput = () => {
  return (
    <div className="min-w-[300px] text-gray-500">
      <Input
        className="w-full px-4"
        prefix={<FaSearch />}
        suffix={<IoMdClose />}
        placeholder="Bạn cần tìm gì"
      />
    </div>
  );
};

const nav = [
  {
    icon: <PiPhoneThin size={34} />,
    label: (
      <p className="text-[12px]">
        Gọi mua hàng <br />
        1800.2044
      </p>
    ),
    link: "contact",
  },
  {
    icon: <PiMapPinThin size={34} />,
    label: (
      <p className="text-[12px]">
        Của hàng <br />
        gần bạn
      </p>
    ),
    link: "shop",
  },
  {
    icon: <CiDeliveryTruck size={34} />,
    label: (
      <p className="text-[12px]">
        Tra cứu <br />
        Đơn hàng
      </p>
    ),
    link: "invoice",
  },
];

export const Nav = () => {
  return (
    <>
      {nav.map((item, index) => (
        <Link href={item.link} key={index}>
          <div className="flex gap-1">
            {item.icon}
            {item.label}
          </div>
        </Link>
      ))}
    </>
  );
};

export const Cart = () => {
  return (
    <Link href="/cart">
      <div className="flex gap-1">
        <PiShoppingCartSimpleThin size={34} />
        <p className="text-[12px]">
          Giỏ <br /> hàng
        </p>
      </div>
    </Link>
  );
};

export const Auth = () => {
  return (
    <Link href="/login">
      <div className="flex gap-1">
        <HiOutlineUserCircle size={34} />
        <p className="text-[12px]">
          Đăng <br /> nhập
        </p>
      </div>
    </Link>

    // <Image
    //   className="rounded-full"
    //   width={34}
    //   height={34}
    //   alt="avatar"
    //   src="/user.png"
    // />
  );
};
