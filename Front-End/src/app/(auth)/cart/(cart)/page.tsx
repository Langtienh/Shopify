import Cart from "@/app/(auth)/cart/_components/cart";
import BackBtn from "@/app/(auth)/_components/btn.back";
import { BuyBtn } from "@/app/(auth)/cart/_components/button";
import HeaderAuth from "@/app/(auth)/_components/header/auth.header";

export default function Page() {
  return (
    <>
      <HeaderAuth />
      <div className="bg-[#f4f6f8] relative pt-14 min-h-screen">
        <div className="p-[10px]">
          <div className="max-w-[600px] h-full w-full mx-auto">
            <div className="p-[10px] flex border-b mb-4">
              <BackBtn />
              <p className="font-bold text-[18px] flex-1 text-center">
                Giỏ hàng của bạn
              </p>
            </div>
            <Cart />
          </div>
        </div>
        <BuyBtn />
      </div>
    </>
  );
}
