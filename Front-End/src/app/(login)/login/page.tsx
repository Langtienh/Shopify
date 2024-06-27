import { Button } from "antd";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      Login
      <Link href="/">
        {" "}
        <Button danger>Back home</Button>
      </Link>
    </>
  );
}
