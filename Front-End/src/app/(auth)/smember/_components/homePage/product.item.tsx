import { priceShow, priceThrough, productToSlug } from "@/lib/ultils";
import Link from "next/link";
import Image from "next/image";
export default function ProductItem({ product }: { product: Love }) {
  return (
    <Link
      className="group"
      key={`$product-item-${product.id}`}
      href={productToSlug(product)}
    >
      <div className="bg-white flex gap-1 flex-col p-[10px] border shadow-md rounded-lg hover:shadow-xl cursor-pointer">
        <div className="flex justify-center">
          <Image
            className="relative z-0 group-hover:scale-[1.05]"
            width={160}
            height={160}
            alt={product.name}
            src={product.image}
          />
        </div>
        <h2 className="font-bold text-sm h-[60px] line-clamp-3">
          {product.name}
        </h2>
        <div className="flex items-baseline gap-1 font-bold">
          <span className="text-[15px] text-red-500">{priceShow(product)}</span>
          <span className="line-through text-gray-500 text-[13px]">
            {priceThrough(product)}
          </span>
        </div>
        <div className="flex gap-1 items-center border-t pt-[10px]">
          <div className="flex items-center">
            <StarYellow />
            <StarYellow />
            <StarYellow />
            <StarYellow />
            <StarGray />
          </div>
          <span className="text-[12px] font-medium text-gray-900 dark:text-white">
            100 đánh giá
          </span>
        </div>
      </div>
    </Link>
  );
}

const StarYellow = () => (
  <svg
    className="size-3 text-yellow-300 ms-1"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);
const StarGray = () => (
  <svg
    className="size-3 ms-1 text-gray-300 dark:text-gray-500"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);
