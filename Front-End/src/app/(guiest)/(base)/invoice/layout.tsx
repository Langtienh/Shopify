import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "No data",
  description: "No data",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
