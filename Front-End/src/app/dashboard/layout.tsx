import { Metadata } from "next";
import { Sider } from "@/components/app/dashboard";
import Trigger from "@/components/trigger";

export const metadata: Metadata = {
  title: "Bảng điều khiển",
  description: "Bảng điều khiển",
};
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Trigger />
      <div className="flex gap-x-5 bg-[#eff2f6]">
        <Sider />
        <main className="flex-1 h-screen overflow-y-scroll px-5 py-10">
          {children}
        </main>
      </div>
    </>
  );
}
