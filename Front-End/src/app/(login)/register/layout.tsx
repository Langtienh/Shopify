import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng kí",
  description: "Tạo tài khoản",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
