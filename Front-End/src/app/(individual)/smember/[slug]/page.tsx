import { Button } from "antd";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="w-full py-64 flex flex-col gap-3 justify-center items-center">
      <h1 className="font-bold text-xl">Trang chưa hoàn thiện</h1>
      <Link href="/">
        <Button danger>Back home</Button>
      </Link>
    </div>
  );
}
