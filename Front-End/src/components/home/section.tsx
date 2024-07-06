import NavBrand from "@/components/global/nav.brand";
import ProductTop from "@/components/product/product.top";
import { translateCategory } from "@/utils/translate";

export default async function Section({
  category,
}: {
  category: CategoryResponse;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl capitalize">
        {translateCategory(category.name)} bán chạy hôm nay
      </h2>
      <NavBrand category={category.name} />
      <ProductTop category={category} />
    </div>
  );
}
