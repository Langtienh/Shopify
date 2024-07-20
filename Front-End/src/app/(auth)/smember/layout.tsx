import type { Metadata } from "next";
import NavSmemver from "@/app/(auth)/smember/_components/nav";

export const metadata: Metadata = {
  title: "Smember | Tri ân khách hàng thân thiết - tích điểm đổi quà",
  description: "Smember | Tri ân khách hàng thân thiết - tích điểm đổi quà",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#f4f6f8]">
      <div className="flex py-5 px-[10px] mx-6 flex-wrap gap-6">
        <div className="hidden md:block md:w-[250px] flex-shrink-0">
          <NavSmemver />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
