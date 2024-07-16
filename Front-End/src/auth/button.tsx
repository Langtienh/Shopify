import { signOut } from "@/auth/auth";
import { Button, Image } from "antd";
import { signIn } from "next-auth/react";

export function SignOut() {
  return (
    <form
      key={2}
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button htmlType="submit" type="text">
        Đăng suất
      </Button>
    </form>
  );
}

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
];

export function SignIn({
  callbackUrl,
  provider,
}: {
  callbackUrl: string;
  provider: string;
}) {
  const item = providers.find((item) => item.name === provider);
  if (item)
    return (
      <form
        action={async () => {
          "use server";
          await signIn(provider, { redirectTo: callbackUrl });
        }}
      >
        <Button htmlType="submit" type="text" className="flex gap-3">
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
      </form>
    );
  return <Button>No provider</Button>;
}
