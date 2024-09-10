"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Noiti from "@/components/global/header/ui/modal.noiti";
import { usePathname } from "next/navigation";
import RenderIf from "@/components/global/renderif";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth.context";
import { useLoginModal } from "@/contexts/loginModal.context";
import { useSession } from "next-auth/react";

export const Auth = () => {
  // menu
  const [isShow, setShow] = useState<boolean>(false);
  const hiddenNoiti = () => setShow(false);

  // avatar
  const { user } = useAuth();
  const { showLoginModal } = useLoginModal();
  const isLogin = !!user;

  // auth.js
  const data = useSession().data;
  const authUser = data?.user;

  const path = usePathname();
  useEffect(() => {
    setShow(false);
  }, [path]);
  return (
    <>
      {user && (
        <>
          <button
            onClick={() => setShow((pre) => !pre)}
            className="flex flex-col text-white items-center px-4 py-1 rounded-lg bg-white bg-opacity-30"
          >
            <Avatar className="size-8">
              <AvatarImage alt={user.fullName} src={user.avatar} />
              <AvatarFallback>
                <Image
                  src="/images/default/avatar.jpg"
                  alt={`${user.fullName}'s profile picture`}
                  className="rounded-full cursor-pointer"
                  width={34}
                  height={34}
                />
              </AvatarFallback>
            </Avatar>
          </button>
          <Noiti hiddenNoiti={hiddenNoiti} isShow={isShow} />
        </>
      )}
      <RenderIf renderIf={!isLogin && !authUser}>
        <Link href="/login">
          <div className="flex gap-1 items-center">
            <FaUser size={28} />
            <p className="text-[12px]">
              Đăng <br /> nhập
            </p>
          </div>
        </Link>
      </RenderIf>
      {authUser && !user && (
        <button
          onClick={() => showLoginModal(path)}
          className="flex flex-col text-white items-center px-4 py-1 rounded-lg bg-white bg-opacity-30"
        >
          <Avatar className="size-8">
            <AvatarImage alt={authUser.name} src={authUser.image} />
            <AvatarFallback>
              <Image
                src="/images/default/avatar.jpg"
                alt="avatar"
                className="rounded-full cursor-pointer"
                width={34}
                height={34}
              />
            </AvatarFallback>
          </Avatar>
        </button>
      )}
    </>
  );
};
