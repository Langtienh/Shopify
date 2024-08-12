import { getProductById } from "@/services/product";
import { productToSlug } from "@/lib/utils2";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

export default async function BreadcrumbCustom({
  productId,
}: {
  productId: number;
}) {
  const product = await getProductById(productId);
  const breadcrumb: { name: string; link: string }[] = [];
  breadcrumb.push({
    name: product.category,
    link: `/products/${product.category}.html`,
  });
  breadcrumb.push({
    name: product.brand,
    link: `/products/${product.category}/${product.brand}.html`,
  });
  breadcrumb.push({
    name: product.name,
    link: productToSlug(product.name, product.id),
  });
  return (
    <div className=" bg-white shadow-md">
      <div className="h-[30px] w-full max-w-[1200px] mx-auto px-[10px] flex items-center text-[12px] text-[#707070] overflow-auto no-scrollbar text-nowrap">
        <Link href="/" className="flex items-center gap-2 me-3">
          <AiFillHome className="text-red-500" size={14} />
          <span>Trang chủ</span>
        </Link>
        {!!breadcrumb.length &&
          breadcrumb.map((item, index) => (
            <Link
              className="flex items-center gap-2 me-3 capitalize"
              key={`breadcrumd-custom-${index}'`}
              href={item.link}
            >
              <MdNavigateNext size={14} />
              <span>{item.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
