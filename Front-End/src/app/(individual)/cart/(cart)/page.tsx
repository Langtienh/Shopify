import { InputNumber } from "antd";
import Image from "next/image";
import Link from "next/link";
import {
  discoutForMember,
  priceShow,
  priceThrough,
  productToSlug,
} from "@/lib/utils2";
import { IoGift } from "react-icons/io5";
import {
  AddItemBTN,
  BuyBtn,
  ClearListBtn,
  DeleteItemBTN,
  SubItemBTN,
} from "@/components/app/individual/cart/button";
import { getCart } from "@/services/cart";
import RenderIf from "@/components/global/renderif";
import { CheckAll, CheckItem } from "@/components/app/individual/cart/checked";
import CartTriggerAction from "@/components/trigger/cart.action";

export default async function Page({
  searchParams,
}: {
  searchParams: { checkList?: string };
}) {
  const cart = await getCart();
  const cartItems = cart.cartItems;
  const listId = cartItems.map((item) => item.id);
  const checkList = searchParams.checkList
    ? searchParams.checkList.split(",").map((item) => +item)
    : [];
  const checkAll = checkList.length === cart.totalProduct;
  const indeterminate =
    0 < checkList.length && checkList.length < cart.totalProduct;
  const listPrice = cartItems
    .filter((item) => checkList.includes(item.id))
    .map((item) => item.price * item.quantity);

  const totalPrice = listPrice.reduce(
    (preValue, currentItem) => preValue + currentItem,
    0
  );
  return (
    <>
      <CartTriggerAction totalQuantity={cart.totalQuantity} />
      <RenderIf renderIf={cartItems.length}>
        <div className="flex justify-between items-center mb-[10px] h-9">
          <CheckAll
            checkAll={checkAll}
            indeterminate={indeterminate}
            listId={listId}
          />
          {(indeterminate || checkAll) && (
            <ClearListBtn checkList={checkList} />
          )}
        </div>
        <ul className=" flex flex-col gap-[20px] mb-[100px]">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="p-[10px] rounded-lg bg-white border shadow-lg"
            >
              <div className="py-[10px] flex justify-between">
                <div className="w-[114px] flex-shrink-0 flex-grow-0 flex">
                  <div className="flex flex-col pr-3">
                    <CheckItem checkList={checkList} id={item.id} />
                  </div>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt={item.name}
                  />
                </div>
                <div className=" w-3/4 flex flex-col gap-2 justify-between">
                  <div className="flex justify-between">
                    <Link
                      className="flex-1 hover:underline text-[#3a3a3a] hover:text-[#6a6a6a]"
                      href={productToSlug(item.name, item.productId)}
                    >
                      {item.name}
                    </Link>
                    <div className="w-[1/6] flex flex-shrink-0 justify-end">
                      <DeleteItemBTN id={item.id} checkList={checkList} />
                    </div>
                  </div>
                  <div className="flex gap-[10px] flex-wrap justify-between items-center">
                    <div className="flex gap-[10px] items-baseline">
                      <p className="text-red-600 font-bold text-[17px]">
                        {priceShow(item.price, item.discount)}
                      </p>
                      <p className="text-gray-600 font-bold text-sm line-through">
                        {priceThrough(item.price)}
                      </p>
                    </div>
                    <div className="px-0 ml-auto">
                      <div className="flex">
                        <SubItemBTN
                          disabled={item.quantity === 1}
                          cartItem={item}
                        />
                        <div className="w-10 flex justify-center">
                          <InputNumber readOnly value={item.quantity} />
                        </div>
                        <AddItemBTN cartItem={item} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-6 my-6">
                <div className="flex gap-2">
                  <IoGift size={24} />
                  <p>Chương trình khuyến mãi</p>
                </div>
                <ul className="pl-10 pt-1 list-disc text-[13px]">
                  <li className="text-base text-red-600 font-bold">
                    Giảm thêm {discoutForMember(item.discountForMember)} cho
                    SMember
                  </li>
                  <li>
                    Giảm ngay 200K khi mua {item.name} (không áp dụng cùng giảm
                    giá qua galaxy gift, xem chi tiết sản phẩm và điều kiện áp
                    dụng tại đây)
                  </li>
                  <li>Liên hệ hotline 1800.2097 để được GIÁ ĐẶC BIỆT</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </RenderIf>
      <RenderIf renderIf={!cartItems.length}>
        <div className="flex flex-col justify-center items-center py-[100px]">
          <Image
            width={262}
            height={197}
            alt="Cart-empty"
            src="/images/default/Cart-empty.webp"
          />
          <div className="text-center w-[310px] my-4">
            Giỏ hàng của bạn đang trống. <br /> Hãy chọn thêm sản phẩm để mua
            sắm nhé
          </div>
        </div>
      </RenderIf>
      <BuyBtn checkList={checkList} totalPrice={totalPrice} />
    </>
  );
}
