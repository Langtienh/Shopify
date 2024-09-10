import "./globals.css";
import { Roboto } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextAuthWrapper from "@/auth/wrapper";
import { LoginModal } from "@/components/global/login-modal";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/contexts/auth.context";
import LoginModalProvider from "@/contexts/loginModal.context";
import CartProvider from "@/contexts/cart.context";
import WishListProvider from "@/contexts/wishLish.context";
import CheckoutProvider from "@/contexts/checkout.context";

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
            <LoginModalProvider>
              <CartProvider>
                <WishListProvider>
                  <AuthProvider>
                    <CheckoutProvider>{children}</CheckoutProvider>
                  </AuthProvider>
                </WishListProvider>
              </CartProvider>
              <LoginModal />
            </LoginModalProvider>
          </NextAuthWrapper>
        </AntdRegistry>
        <Toaster />
      </body>
    </html>
  );
}
