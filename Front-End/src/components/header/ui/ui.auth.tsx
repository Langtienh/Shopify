"use client";

import httpCustom from "@/actions/customAPI";
import { logoutAction } from "@/app/(auth)/_lib/actions";
import { DELAY } from "@/lib/ultils";
import { splitFullName } from "@/lib/ultils";
import { Button, Image, Spin, Tooltip } from "antd";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export const Auth = () => {
  const { data: session } = useSession();
  const [spinning, setSpinning] = useState<boolean>(false);
  const user = session?.user;
  const Logout = async () => {
    setSpinning(true);
    await DELAY(1000);
    await logoutAction(session?.token);
    await httpCustom.get("/cookies/logout");
    await signOut({ callbackUrl: "/login" });
    setSpinning(false);
  };
  const authDropdown: JSX.Element[] = [
    <Link key={1} href="/info">
      <Button type="text">Thông tin cá nhân</Button>
    </Link>,

    <Button htmlType="submit" type="text" onClick={Logout} key={2}>
      Đăng suất
    </Button>,
  ];

  if (user) {
    return (
      <>
        <Spin fullscreen spinning={spinning} />
        <Tooltip
          placement="bottom"
          color="#fff"
          title={
            <div className="flex flex-col">
              {authDropdown.map((item) => item)}
            </div>
          }
        >
          <div className="flex flex-col text-white items-center">
            <Image
              className="rounded-full"
              width={34}
              height={34}
              alt="avatar"
              src={user.avatar || "/images/default/avatar.jpg"}
              fallback="/nestjs-icon.ico"
              preview={false}
            />
          </div>
        </Tooltip>
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
