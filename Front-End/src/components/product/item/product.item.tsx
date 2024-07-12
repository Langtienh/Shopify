"use client";
import {
  discoutForMember,
  priceShow,
  priceThrough,
  productToSlug,
  view,
} from "@/lib/ultils";
import { Badge, Image, Rate } from "antd";
import Link from "next/link";

export default function ProductItem({ product }: { product: ProductResponse }) {
  return (
    <Link
      className="hover:scale-[1.02] "
      key={`$product-item-${product.id}`}
      href={productToSlug(product)}
    >
      <Badge.Ribbon text={`Giảm ${product.discount}%`} color="red">
        <div className="flex gap-1 flex-col p-[10px] border shadow-md rounded-lg hover:shadow-xl cursor-pointer">
          <div className="flex justify-center">
            <Image
              width={160}
              height={160}
              alt={product.name}
              src={product.image}
              fallback="/productError.png"
              preview={false}
            />
          </div>
          <h2 className="font-bold text-sm h-[60px] line-clamp-3">
            {product.name}
          </h2>
          <div className="flex items-baseline gap-1 font-bold">
            <span className="text-[15px] sm:text-base text-red-500">
              {priceShow(product)}
            </span>
            <span className="line-through text-gray-500 text-[13px] sm:text-sm">
              {priceThrough(product)}
            </span>
          </div>
          <div className="h-5">
            {!!product.discountForMember && (
              <p className="text-[10px] sm:text-[12px]">
                Student giảm thêm đến{" "}
                <span className="text-red-500 text-[12px] sm:text-sm font-bold">
                  {discoutForMember(product)}
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
            <Rate
              className="flex gap-0 items-center *:mr-0 text-[#f59e0b] *:text-[12px] sm:*:text-[15px] *:m-0 *:p-0"
              allowHalf
              defaultValue={3.5}
            />
            <p className="font-bold text-red-500 text-[12px] sm:text-base">
              {view(product)} Rate
            </p>
          </div>
        </div>
      </Badge.Ribbon>
    </Link>
  );
}
