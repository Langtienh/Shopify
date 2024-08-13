import { getWishList } from "@/services/wish-list";
import SliderClient from "./client";

export default async function Slider() {
  const wishlist = await getWishList();
  const isShow = wishlist?.length;
  if (isShow)
    return (
      <>
        <h2 className="text-xl font-bold py-2">Sản phẩm yêu thích của bạn</h2>
        <div className="overflow-hidden px-1">
          <SliderClient wishlist={wishlist} />
        </div>
      </>
    );
  return <></>;
}
