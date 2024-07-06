"use client";
import { Button, Image } from "antd";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
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
  const { data: session } = useSession();

  return (
    <>
      {providers.map((item) => (
        <Button
          onClick={() => {
            if (item.name !== "zalo") signIn(item.name);
          }}
          type="text"
          key={item.title}
          className="flex gap-3"
        >
          <div>
            <Image width={24} height={24} src={item.image} alt={item.title} />
          </div>
          <span>{item.title}</span>
        </Button>
      ))}
      {session && session.user && (
        <>
          <Button>Xin chào {session.user.name}</Button>
          <Button onClick={() => signOut()}>Đăng suất</Button>
        </>
      )}
    </>
  );
}

// export default function SignGoogle() {
//   if (session && session.user) {
//     console.log(session.user);
//     return (

//     );
//   }

//   return (
//     <Link href="/api/auth/signin">
//       <Button>Đăng nhập với google hoặc github</Button>
//     </Link>
//   );
// }
