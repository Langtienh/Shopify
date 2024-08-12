import { Header2 } from "@/components/global/header";
import type { Metadata } from "next";
import NavPayment, {
  NavHeader,
  NavSubmit,
} from "@/components/app/individual/payment/nav";

export const metadata: Metadata = {
  title: "Thanh toán",
  description: "Thanh toán",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header2 />
      <div className="bg-[#f4f6f8] min-h-screen">
        <div className="max-w-[600px] mx-auto pb-[140px]">
          <NavHeader />
          <NavPayment />
          {children}
          <NavSubmit />
        </div>
      </div>
    </>
  );
}
