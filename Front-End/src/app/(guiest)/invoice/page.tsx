import { Button } from "antd";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Page() {
  const userCookie = cookies().get("user");
  if (!userCookie) redirect("/login");
  return (
    <>
      No data
      <Link href="/">
        {" "}
        <Button danger>Back home</Button>
      </Link>
    </>
  );
}
