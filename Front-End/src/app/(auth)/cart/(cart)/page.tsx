import Cart from "@/app/(auth)/cart/_components/cart";
import BackBtn from "@/app/(auth)/_components/btn.back";
import { BuyBtn } from "@/app/(auth)/cart/_components/button";

export default function Page() {
  return (
    <>
      <div className="bg-[#f4f6f8] relative">
        <div className="p-[10px]">
          <div className="max-w-[600px] w-full mx-auto">
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
