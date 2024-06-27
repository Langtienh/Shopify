import NavBrand from "@/components/global/navBrand";
import ProductList from "@/components/global/product.list";

export default async function Section({ category }: { category: TCategory }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl capitalize">
        {category.category} bán chạy hôm nay
      </h2>
      <NavBrand category={category} />
      <ProductList category={category} />
    </div>
  );
}
