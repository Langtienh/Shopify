import "./globals.css";
import { Roboto } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextAuthWrapper from "@/hooks/nextauth.wrapper";

const roboto = Roboto({
  weight: "400",
  subsets: ["vietnamese", "latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <link rel="icon" href="/nestjs-icon.ico" />
      </head>

      <AntdRegistry>
        <NextAuthWrapper>
          <body>{children}</body>
        </NextAuthWrapper>
      </AntdRegistry>
    </html>
  );
}
