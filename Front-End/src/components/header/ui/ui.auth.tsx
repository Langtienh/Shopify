"use client";

import { Image } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Noiti from "@/components/header/ui/modal.noiti";
import { usePathname } from "next/navigation";

export const Auth = () => {
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const hiddenNoiti = () => setShow(false);
  const user = session?.user;
  const path = usePathname();
  useEffect(() => {
    setShow(false);
  }, [path]);

  if (user) {
    return (
      <>
        <button
          onClick={() => setShow((pre) => !pre)}
          className="flex flex-col text-white items-center px-4 py-1 rounded-lg bg-white bg-opacity-30"
        >
          <Image
            className="rounded-full cursor-pointer"
            width={34}
            height={34}
            alt="avatar"
            src={user.avatar || "/images/default/avatar.jpg"}
            fallback="/nestjs-icon.ico"
            preview={false}
          />
        </button>
        <Noiti hiddenNoiti={hiddenNoiti} show={show} />
      </>
    );
  }
  return (
    <Link href="/login">
      <div className="flex gap-1 items-center">
        <FaUser size={28} />
        <p className="text-[12px]">
          Đăng <br /> nhập
        </p>
      </div>
    </Link>
  );
};
