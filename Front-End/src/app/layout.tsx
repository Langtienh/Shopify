import "./globals.css";
import { Roboto } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AuthProviders from "@/components/providers/nextauth.provider";

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
        <AuthProviders>
          <body>{children}</body>
        </AuthProviders>
      </AntdRegistry>
    </html>
  );
}
