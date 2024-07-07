"use client";
import { Image } from "antd";
import { useSession } from "next-auth/react";

export default function Userrr() {
  const { data: session } = useSession();
  if (session && session.user && session.user.image) {
    console.log(session.user);
    return (
      <div className="flex flex-col justify-center items-center">
        <p>{session.user.email}</p>
        <p>{session.user.name}</p>
        <Image width={100} height={100} alt="avatar" src={session.user.image} />
      </div>
    );
  }
  return <></>;
}
