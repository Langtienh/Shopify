import "./globals.css";
import { Roboto } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextAuthWrapper from "@/auth/wrapper";
import ReduxWrapper from "@/redux/wrapper";
import { LoginModal } from "@/components/global/login-modal";
import { Toaster } from "@/components/ui/toaster";
import Trigger from "@/components/trigger";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["vietnamese"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo/shopifyy.ico" />
      </head>
      <body className={roboto.className}>
        <AntdRegistry>
          <NextAuthWrapper>
            <ReduxWrapper>
              <Trigger />
              {children}
              <LoginModal />
            </ReduxWrapper>
          </NextAuthWrapper>
        </AntdRegistry>
        <Toaster />
      </body>
    </html>
  );
}
