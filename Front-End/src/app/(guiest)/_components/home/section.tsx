import NavBrand from "@/components/navbrand/nav.brand";
import ProductTop from "@/app/(guiest)/_components/home/product.top";
import { translateCategory } from "@/lib/ultils";

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
