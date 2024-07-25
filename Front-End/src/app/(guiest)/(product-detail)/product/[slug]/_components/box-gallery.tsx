import Image from "next/image";
import { FaGift, FaPhoneAlt } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Describe, MoreOffer, Shop } from "@/hard-coding/data";
import { MdCurrencyExchange } from "react-icons/md";
import { discoutForMember, priceShow, priceThrough } from "@/lib/ultils";
import Slider from "@/app/(guiest)/(product-detail)/product/[slug]/_components/slider";
import {
  AddToCartButton,
  BuyButton,
  SelectColor,
} from "@/app/(guiest)/(product-detail)/product/[slug]/_components/button";
import Slider2 from "@/app/(guiest)/(product-detail)/product/[slug]/_components/slider2";

export default function Gallery({ product }: { product: ProductResponse }) {
  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start">
      <div className="flex-1 lg:top-[154px] lg:sticky ">
        <Slider
          image={product.image}
          name={product.name}
          productId={product.id}
        />
        <div className="grid grid-cols-2 gap-4 mt-3 items-stretch">
          <ul className="p-[10px] border-2 border-gray-300 rounded-lg flex flex-col gap-4">
            <h2 className="font-bold">Thông tin sản phẩm</h2>
            {Describe.map((item, index) => (
              <li key={item} className="flex gap-3">
                <Image
                  width={20}
                  height={20}
                  src={`/images/detail/detail-${index + 1}.svg`}
                  alt={item}
                />
                <p className="text-sm">{item}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            <p className="font-bold mb-auto">
              {`Có ${Shop.length} cửa hàng có sản phẩm`}
            </p>
            <ScrollArea className="h-[204px] border-2 border-gray-300 rounded-lg overflow-hidden">
              {Shop.map((item, index) => (
                <li
                  key={`shop-${index}`}
                  className={`flex gap-2 items-center overflow-hidden text-[12px] p-2 ${
                    index % 2 === 0 ? "bg-gray-100" : ""
                  }`}
                >
                  <FaPhoneAlt className="text-red-600" />
                  <span className="text-red-600 font-bold">{item.phone}</span>
                  <RiMapPinLine className="text-blue-600" />
                  <Link
                    target="_blank"
                    passHref
                    href={item.link}
                    className="text-blue-600 text-nowrap underline"
                  >
                    {item.address}
                  </Link>
                </li>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="basis-[400px] lg:sticky lg:top-[154px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-sm font-bold">
            Chọn màu để xem giá và chi nhánh có hàng
          </h2>
          <SelectColor price={product.price} />
          <div className="h-[60px] rounded-xl bg-[#eeeeef] flex gap-3 p-[5px]">
            <div className="text-gray-700 flex-1 gap-3 h-full flex justify-center items-center hover:bg-white rounded-lg">
              <MdCurrencyExchange size={30} />
              <div>
                <p className="font-bold text-center">10.000.000đ</p>
                <p className="text-sm">Khi thu cũ lên đời</p>
              </div>
            </div>
            <div className="text-gray-700 flex-1 h-full flex flex-col justify-center items-center border-[2px] border-red-600 bg-white rounded-lg">
              <p className="font-bold text-center text-red-600">
                {priceShow(product.price, product.discount)}
              </p>
              <p className="line-through text-sm">
                {priceThrough(product.price)}
              </p>
            </div>
          </div>
          <Slider2 />
          <div className="border border-[#fee2e2] rounded-lg overflow-hidden">
            <p className="bg-[#fee2e2] text-red-600 font-bold p-2 flex items-center gap-3">
              <FaGift />
              Khuyến mãi
            </p>
            <div className="p-2">
              <ul className="text-sm list-disc list-inside">
                <li className="text-red-600 font-bold">
                  Giảm thêm {discoutForMember(product.discountForMember)} cho
                  Smember
                </li>
                <li>
                  Giảm ngay 200K khi mua Samsung Fit 3 (không áp dụng cùng giảm
                  giá qua galaxy gift, xem chi tiết sản phẩm và điều kiện áp
                  dụng tại đây)
                </li>
                <li className=" font-bold">
                  Nhận hàng trong 2h, miễn phí giao hàng toàn quốc
                </li>
              </ul>
              <p className="text-red-600 text-sm font-bold bg-[#fee2e2] py-1 px-2 my-2 rounded-lg">
                LIÊN HỆ HOTLINE 1800.2097 ĐỂ ĐƯỢC GIÁ ĐẶC BIỆT
              </p>
            </div>
          </div>
          {/* button */}
          <div className="h-[60px] flex gap-4">
            <BuyButton />
            <AddToCartButton productId={product.id} />
          </div>
          <div className="border-2 border-gray-200 overflow-hidden rounded-lg">
            <h2 className="bg-gray-200 p-2 font-bold">Ưu đãi thêm</h2>
            <ul>
              {MoreOffer.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="py-1 px-2 flex gap-3 items-start"
                >
                  <Image
                    width={16}
                    height={16}
                    src="/images/detail/check-sucsess.svg"
                    alt="checked-icon"
                  />
                  <p className="text-sm hover:underline cursor-pointer">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
