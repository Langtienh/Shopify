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
  return children;
}
