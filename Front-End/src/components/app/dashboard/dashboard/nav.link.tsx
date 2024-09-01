"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaComments } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";
import { MdPowerSettingsNew } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { logout } from "@/services/auth";
import { setTotalQuantity } from "@/redux/cart/slice";
import { setWishList } from "@/redux/wish-list/slice";
import { useAppDispatch } from "@/redux/store";
import { updateUserInfo } from "@/redux/user-info/slice";
const links = [
  { name: "Home", href: "/dashboard", icon: FaHome },
  { name: "Products", href: "/dashboard/products", icon: AiFillProduct },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: HiDocumentDuplicate,
  },
  { name: "Users", href: "/dashboard/users", icon: FaUser },
  { name: "Comments", href: "/dashboard/comments", icon: FaComments },
  { name: "More", href: "/dashboard/more", icon: CgDetailsMore },
];

export default function NavLinks() {
  const pathname = usePathname();
  const isActive = (link: string) => {
    if (link === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(link);
  };
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex grow items-center justify-center gap-2 rounded-md bg-gray-50 hover:bg-sky-100 hover:text-blue-600 lg:flex-none lg:justify-start py-2 px-3",
              {
                "bg-sky-100 text-blue-600": isActive(link.href),
              }
            )}
          >
            <LinkIcon size={20} className="w-6" />
            <p className="hidden lg:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

export const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(setTotalQuantity(0));
    dispatch(setWishList([]));
    dispatch(updateUserInfo(null));
    await logout();
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="flex w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3  font-bold hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <MdPowerSettingsNew size={24} className="w-6" />
        <Link href="/">
          <div className="hidden md:block">Sign Out</div>
        </Link>
      </button>
    </>
  );
};
