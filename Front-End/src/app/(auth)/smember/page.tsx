import { Button } from "antd";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      smember
      <Link href="/">
        <Button danger>Back home</Button>
      </Link>
    </>
  );
}
