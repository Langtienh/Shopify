import { GuiestHeader } from "@/components/app/guiest/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify | Uy tín-Chất lượng-Giá rẻ",
  description:
    "Shop bán đồ công nghệ  giá rẻ uy tín, chất lượng nhất nhất Việt Nam",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <GuiestHeader />
      <main className="text-[#444444] max-w-[1200px] mx-auto w-full pt-[122px]">
        {children}
      </main>
    </div>
  );
}
