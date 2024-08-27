"use client";
import { Button, Image } from "antd";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const signInWith = async (provider: string) => {
    await signIn(provider, { callbackUrl });
    router.push("/");
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
