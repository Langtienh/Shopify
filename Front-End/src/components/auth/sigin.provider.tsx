"use client";
import { openNotification } from "@/lib/nofication";
import { Button, Image } from "antd";
import { signIn } from "next-auth/react";
const providers = [
  {
    title: "Google",
    image: "/logo/google.png",
    name: "google",
  },
  {
    title: "Github",
    image: "/logo/Github.jfif",
    name: "github",
  },
  {
    title: "Zalo",
    image: "/logo/zalo.png",
    name: "zalo",
  },
];

export default function SignProvider() {
  const signInWith = async (provider: string) => {
    try {
      await signIn(provider);
      openNotification({
        message: "Đăng nhập thành công",
        description: "Vui lòng đợi trong giây lát",
        notificationType: "success",
      });
    } catch {
      openNotification({
        message: "Đăng nhập thất bại",
        description: "Tài khoản hoặc mật khẩu không chính xác",
        notificationType: "error",
      });
    }
  };
  return (
    <>
      {providers.map((item) => (
        <Button
          onClick={() => {
            if (item.name !== "zalo") signInWith(item.name);
          }}
          type="text"
          key={item.title}
          className="flex gap-3"
        >
          <div>
            <Image
              preview={false}
              width={24}
              height={24}
              src={item.image}
              alt={item.title}
            />
          </div>
          <span>{item.title}</span>
        </Button>
      ))}
    </>
  );
}
