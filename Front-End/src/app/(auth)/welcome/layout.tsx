import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to project Shopify",
  description: "Welcome to project Shopify",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
