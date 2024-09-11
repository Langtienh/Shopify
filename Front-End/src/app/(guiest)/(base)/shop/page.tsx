import { Button } from "antd";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col gap-3 justify-center items-center">
      <h1 className="font-bold text-xl">Trang chưa hoàn thiện</h1>
      <Link href="/">
        <Button danger>Back home</Button>
      </Link>
    </div>
  );
}
