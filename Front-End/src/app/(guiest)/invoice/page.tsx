import { Button } from "antd";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  // const session = await getServerSession(authOptions);
  // if (!session?.user) redirect("/login");
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
