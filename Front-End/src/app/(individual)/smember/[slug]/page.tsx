import { Button } from "antd";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <h2 className="font-bold text-xl">No data</h2>
      <Link href="/smember">
        <Button danger>Back home</Button>
      </Link>
    </>
  );
}
