"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaRegHandshake, FaComments } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";
import { TbCategoryFilled } from "react-icons/tb";
import httpCustom from "@/actions/customAPI";
import { signOut } from "next-auth/react";
import { MdPowerSettingsNew } from "react-icons/md";
const links = [
  { name: "Home", href: "/dashboard", icon: FaHome },
  { name: "Product", href: "/dashboard/products", icon: AiFillProduct },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: HiDocumentDuplicate,
  },
  { name: "User", href: "/dashboard/users", icon: FaUser },
  { name: "Comments", href: "/dashboard/comments", icon: FaComments },
  { name: "Categories", href: "/dashboard/categories", icon: TbCategoryFilled },
  { name: "Brands", href: "/dashboard/brands", icon: FaRegHandshake },
];

export default function NavLinks() {
  const pathname = usePathname();
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
                "bg-sky-100 text-blue-600": pathname === link.href,
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
  const Logout = async () => {
    await httpCustom.get("/v1/logout");
    await signOut({ callbackUrl: "/login" });
  };
  return (
    <>
      <button
        onClick={Logout}
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
