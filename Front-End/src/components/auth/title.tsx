import Image from "next/image";
import BackBtn from "@/components/auth/btn.back";
import { Divider } from "antd";

const providers = [
  {
    title: "Google",
    image: "/logo/google.png",
  },
  {
    title: "Zalo",
    image: "/logo/zalo.png",
  },
];
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
        {providers.map((item) => (
          <div key={item.title} className="flex gap-3">
            <div>
              <Image width={24} height={24} src={item.image} alt={item.title} />
            </div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <div className="w-full">
        <Divider orientation="center">Hoặc</Divider>
      </div>
    </div>
  );
}
