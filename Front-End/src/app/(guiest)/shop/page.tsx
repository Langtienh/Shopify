import { Button } from "antd";
import Link from "next/link";

export default async function Page() {
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
