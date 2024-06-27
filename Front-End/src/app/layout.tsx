import "./globals.css";
import { Roboto } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
        <link rel="icon" href="./nestjs-icon.ico" />
      </head>
      <AntdRegistry>
        <body>{children}</body>
      </AntdRegistry>
    </html>
  );
}
