import Image from "next/image";
import { Divider } from "antd";
import SignProvider from "@/app/(auth)/_components/sigin.provider";

export default function AuthTitle({ title }: { title: string }) {
  return (
    <>
      <div className="my-5 flex flex-col items-center">
        <Image
          width={100}
          height={100}
          src="/images/Shipper.png"
          alt="Shipper"
        />
        <h2 className="font-bold text-[22px] text-black">{title}</h2>
      </div>
      <div className="text-[18px] flex gap-7 justify-center  py-[18px]">
        <SignProvider />
      </div>
      <div>
        <Divider orientation="center">Hoặc</Divider>
      </div>
    </>
  );
}
