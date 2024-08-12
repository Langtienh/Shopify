"use client";

import { Image } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Noiti from "@/components/global/header/ui/modal.noiti";
import { usePathname } from "next/navigation";
import RenderIf from "@/components/global/renderif";
import { useSession } from "next-auth/react";

export const Auth = () => {
  const [show, setShow] = useState<boolean>(false);
  const hiddenNoiti = () => setShow(false);
  const session = useSession().data;
  const isLogin = session?.user && session.refreshToken;
  const user = session?.user;
  const path = usePathname();
  useEffect(() => {
    setShow(false);
  }, [path]);

  return (
    <>
      <RenderIf renderIf={isLogin}>
        <button
          onClick={() => setShow((pre) => !pre)}
          className="flex flex-col text-white items-center px-4 py-1 rounded-lg bg-white bg-opacity-30"
        >
          <Image
            className="rounded-full cursor-pointer"
            width={34}
            height={34}
            alt="avatar"
            src={user?.avatar || "/images/default/user.svg"}
            fallback="/images/default/user.svg"
            preview={false}
          />
        </button>
        <Noiti hiddenNoiti={hiddenNoiti} show={show} />
      </RenderIf>
      <RenderIf renderIf={!isLogin}>
        <Link href="/login">
          <div className="flex gap-1 items-center">
            <FaUser size={28} />
            <p className="text-[12px]">
              Đăng <br /> nhập
            </p>
          </div>
        </Link>
      </RenderIf>
    </>
  );
};
