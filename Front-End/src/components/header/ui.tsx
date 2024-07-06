"use client";
import { logoutAction } from "@/actions/auth.action";
import { DELAY } from "@/utils/delay";
import { translateCategory } from "@/utils/translate";
import type { MenuProps } from "antd";
import { Button, Dropdown, Image, Tooltip } from "antd";
import Link from "next/link";
import { useState } from "react";
import { CiDeliveryTruck, CiLaptop } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosTabletPortrait } from "react-icons/io";
import { IoWatchOutline } from "react-icons/io5";
import { LuSmartphone } from "react-icons/lu";
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
  brands: BrandResponse[];
}) => {
  let items: MenuProps["items"] = brands.map((item: BrandResponse) => ({
    key: item.id,
    label: <Link href={`/${category}/${item.name}`}>{item.name}</Link>,
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
        {!!category && translateCategory(category)}
      </span>
    </Dropdown>
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

export const Auth = ({ user }: { user: UserResponse | undefined }) => {
  const Logout = async () => {
    await logoutAction();
  };
  const authDropdown: JSX.Element[] = [
    <Link key={1} href="/info">
      <Button type="text">Thông tin cá nhân</Button>
    </Link>,
    <Button type="text" onClick={Logout} key={2}>
      Đăng suất
    </Button>,
  ];
  if (user)
    return (
      <Button type="text">
        <Tooltip
          placement="bottom"
          color="#fff"
          title={
            <div className="flex flex-col">
              {authDropdown.map((item) => item)}
            </div>
          }
        >
          <Image
            className="rounded-full"
            width={34}
            height={34}
            alt="avatar"
            src={user.avatar}
            fallback="/nestjs-icon.ico"
            preview={false}
          />
        </Tooltip>
      </Button>
    );
  return (
    <Link href="/login">
      <div className="flex gap-1">
        <HiOutlineUserCircle size={34} />
        <p className="text-[12px]">
          Đăng <br /> nhập
        </p>
      </div>
    </Link>
  );
};
