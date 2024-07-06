import Image from "next/image";
import BackBtn from "@/components/auth/btn.back";
import { Divider } from "antd";
import SignProvider from "@/components/auth/sigin.provider";

export default function AuthTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full p-[10px]">
        <BackBtn />
      </div>
      <div className="my-5 flex flex-col items-center">
        <Image width={100} height={100} src="/Shipper.png" alt="Shipper" />
        <h2 className="font-bold text-[22px] text-black">{title}</h2>
      </div>
      <div className="text-[18px] flex gap-7 justify-center  py-[18px]">
        <SignProvider />
      </div>
      <div className="w-full">
        <Divider orientation="center">Hoặc</Divider>
      </div>
    </div>
  );
}
