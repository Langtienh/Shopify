import BackBtn from "@/components/app/auth/btn.back";
import HeaderAuth from "@/components/app/auth/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Giỏ hàng của bạn",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderAuth />
      <div className="bg-[#f4f6f8] relative pt-14 min-h-screen">
        <div className="p-[10px]">
          <div className="max-w-[600px] h-full w-full mx-auto">
            <div className="p-[10px] flex border-b mb-4">
              <BackBtn />
              <p className="font-bold text-[18px] flex-1 text-center">
                Giỏ hàng của bạn
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
