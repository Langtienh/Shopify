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
        <div className="w-full fixed z-10 top-full left-0 -translate-y-full">
          <div className="border bg-white flex justify-between items-center p-[10px] pb-4 w-full max-w-[600px] mx-auto rounded-lg shadow-xl">
            <div>
              <p>
                Tạm tính: <span className="text-red-600 font-bold">0đ</span>
              </p>
              <p className="text-[12px] text-gray-500">
                Chưa gồm chiết khấu SMember
              </p>
            </div>
            <BuyBtn />
          </div>
        </div>
      </div>
    </>
  );
}
