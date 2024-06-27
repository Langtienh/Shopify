import NavBrand from "@/components/global/navBrand";
import ProductTop from "@/components/product/product.top";

export default async function Section({ category }: { category: TCategory }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl capitalize">
        {category.category} bán chạy hôm nay
      </h2>
      <NavBrand category={category.category} />
      <ProductTop category={category} />
    </div>
  );
}
