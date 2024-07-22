"use client";
import { NavSmemverData } from "@/app/(auth)/smember/_lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoutBtn } from "@/app/(auth)/smember/_components/button";
import { Tooltip } from "antd";

export default function NavSmemver() {
  const [path, setPath] = useState<string>("/");
  const pathname = usePathname();
  useEffect(() => {
    let newPath = "/" + pathname.replace("/smember", "").replace("/", "");
    setPath(newPath);
  }, [pathname]);
  return (
    <ul className="p-[10px] rounded-xl bg-[#f6fbfc] flex lg:flex-col gap-1 justify-between border">
      {NavSmemverData.map((item) => (
        <Tooltip
          key={item.link}
          title={item.label}
          placement="bottom"
          color="red"
        >
          <Link
            className={
              `${
                path === item.link
                  ? "text-red-500 lg:bg-[#ffeeee] border-red-500 px-[10px] py-2 border "
                  : " text-gray-600 border-[#f6fbfc] border "
              }` + "lg:px-[10px] lg:py-2 flex gap-4 rounded-xl"
            }
            href={`/smember${item.link}`}
          >
            <Image width={18} height={18} alt={item.label} src={item.icon} />
            <span className="hidden lg:inline-block">{item.label}</span>
          </Link>
        </Tooltip>
      ))}

      <LogoutBtn />
    </ul>
  );
}
