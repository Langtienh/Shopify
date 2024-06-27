"use client";
import ImageWithFallback from "@/components/global/image";
import { converPriceToVN } from "@/utils/price";
import { AddProductToCart } from "@/components/product/btn";
import { Badge } from "antd";

export default function ProductItem({ product }: { product: TProduct }) {
  return (
    <Badge.Ribbon text={`Giảm ${product.discount}%`} color="red">
      <div className="flex gap-1 flex-col p-[10px] border shadow-md rounded-lg hover:shadow-xl cursor-pointer">
        <div className="flex justify-center">
          <ImageWithFallback
            width={160}
            height={160}
            alt={product.name}
            src={product.image}
            fallbackSrc="/errorImage.png"
          />
        </div>
        <h2 className="font-bold text-sm h-[60px] line-clamp-3">
          {product.name}
        </h2>
        <div className="flex items-baseline gap-1 font-bold">
          <span className="text-[16px] text-red-500">
            {!!product.priceShow && converPriceToVN(product.priceShow, "đ")}
          </span>
          <span className="line-through text-gray-500 text-sm">
            {!!product.priceThrought &&
              converPriceToVN(product.priceThrought, "đ")}
          </span>
        </div>
        <div className="h-5">
          {!!product.discountForMember && (
            <p className="text-[11px]">
              S-Student giảm thêm đến{" "}
              <span className="text-red-500 text-sm font-bold">
                {converPriceToVN(product.discountForMember, "đ")}
              </span>
            </p>
          )}
        </div>
        <div className=" h-12">
          {!!product.description && (
            <p className="text-[12px] line-clamp-2 p-1 bg-[#f3f4f6] border rounded-md">
              {product.description}
            </p>
          )}
        </div>
        <div className="border-t py-1 flex justify-between items-center">
          <p className="font-bold text-red-500">
            {!!product.viewCount && converPriceToVN(product.viewCount)} lượt xem
          </p>
          <AddProductToCart productId={product.id} />
        </div>
      </div>
    </Badge.Ribbon>
  );
}
