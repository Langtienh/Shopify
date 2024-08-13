import { NavBrand } from "@/components/global/navbrand";
import ProductTop from "./product.top";

export default async function Section({
  category,
}: {
  category: CategoryResponse;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl capitalize">
        {category.label} nổi bật
      </h2>
      <NavBrand category={category.name} />
      <ProductTop category={category} />
    </div>
  );
}
