import BackBtn from "@/components/app/auth/btn.back";
import HeaderAuth from "@/components/app/auth/header";
import Trigger from "@/components/trigger";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smember | Tri ân khách hàng thân thiết - tích điểm đổi quà",
  description: "Smember | Tri ân khách hàng thân thiết - tích điểm đổi quà",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Trigger />
      <HeaderAuth />
      <div className="pt-14">
        <div className="text-[#444444] max-w-[680px] mx-auto w-full px-2  pb-20">
          <div className="w-full p-[10px]">
            <BackBtn />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
