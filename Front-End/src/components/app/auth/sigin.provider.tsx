"use client";
import { openNotification } from "@/lib/nofication";
import { DELAY } from "@/lib/utils2";
import { Button, Image, Spin } from "antd";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
// hardcode
const providers = [
  {
    title: "Google",
    image: "/images/logo/google.png",
    name: "google",
  },
  {
    title: "Github",
    image: "/images/logo/Github.jfif",
    name: "github",
  },
  {
    title: "Zalo",
    image: "/images/logo/zalo.png",
    name: "zalo",
  },
];

export default function SignProvider() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [spinning, setSpinning] = useState<boolean>(false);
  const signInWith = async (provider: string) => {
    try {
      const res = await signIn(provider, { callbackUrl });
      openNotification({
        message: "Đăng nhập thành công",
        description: "Vui lòng đợi trong giây lát",
        notificationType: "success",
      });
      setSpinning(true);
      await DELAY(2000);
      setSpinning(false);
      router.push("/");
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
      <Spin fullscreen spinning={spinning} />
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
