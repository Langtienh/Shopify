"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth.context";
import { useCart } from "@/contexts/cart.context";
import { useWishList } from "@/contexts/wishLish.context";
import { login } from "@/services/auth";
import { message, Button, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const account: LoginDTO = {
  phone: "0121212",
  password: "admindemo",
};

export default function Page() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { updateUser } = useAuth();
  const { updateCart } = useCart();
  const { updateWishList } = useWishList();
  const router = useRouter();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login(account);
      if (res) {
        message.success("Đăng nhập thành công");
        const { user, cart, wishList } = res;
        updateCart(cart);
        updateUser(user);
        updateWishList(wishList);
        router.push("/");
      } else message.error("Tài khoản hoặc mật khẩu không đúng");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Spin spinning={isLoading}>
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-center text-3xl">
              Welcome to Shopify
            </DialogTitle>
            <DialogDescription>
              Bạn có thể tạo mới tài khoản hoặc sử dụng tài khoản admin(demo) do
              chúng tôi cung cấp để có thể xem các chức năng dành cho admin
            </DialogDescription>
            <div className="w-full flex justify-between py-7">
              <Button onClick={handleLogin} size="large">
                Tài khoản có sẵn
              </Button>
              <Link href="/register">
                <Button size="large" danger type="primary">
                  Tạo mới
                </Button>
              </Link>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Spin>
  );
}
