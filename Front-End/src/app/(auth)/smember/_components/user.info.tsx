import { getAllOrderByUserId } from "@/services/invoice";
import UserInfo from "./homePage/info";
import { priceThrough } from "@/lib/ultils";

export default async function Profile() {
  const { totalItem, data, firstItem } = await getAllOrderByUserId();
  const totalPrice = data.reduce((accumulator, item) => {
    return accumulator + item.totalPrice;
  }, 0);
  return (
    <>
      <div className="flex flex-wrap gap-4">
        <UserInfo />
        <div className="p-[10px] w-full mt-auto rounded-xl bg-white border grid grid-cols-2">
          <div className="text-center border-r">
            <div className="text-[28px] font-bold my-2">{totalItem}</div>
            <div className="text-sm">Đơn hàng</div>
          </div>
          <div className="text-center">
            <div className="text-[28px] font-bold my-2">
              {priceThrough(totalPrice)}
            </div>
            <div className="text-sm">Tổng tiền tích lũy</div>
          </div>
        </div>
      </div>
    </>
  );
}
