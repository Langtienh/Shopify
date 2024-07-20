"use client";
import { NavSmemverData } from "@/app/(auth)/smember/_lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoutBtn } from "@/app/(auth)/smember/_components/button";

export default function NavSmemver() {
  const [path, setPath] = useState<string>("/");
  const pathname = usePathname();
  useEffect(() => {
    let newPath = "/" + pathname.replace("/smember", "").replace("/", "");
    setPath(newPath);
  }, [pathname]);
  return (
    <ul className="p-[10px] rounded-xl bg-[#f6fbfc] flex flex-col gap-2">
      {NavSmemverData.map((item) => (
        <Link
          className={
            `${
              path === item.link
                ? "text-red-500 bg-[#ffeeee] border-red-500"
                : " text-gray-600 border-[#f6fbfc]"
            }` + " px-[10px] py-2 flex gap-4  rounded-xl border #ffeeee"
          }
          href={`/smember${item.link}`}
          key={item.link}
        >
          <Image width={18} height={18} alt={item.label} src={item.icon} />
          <span>{item.label}</span>
        </Link>
      ))}
      <LogoutBtn />
    </ul>
  );
}
