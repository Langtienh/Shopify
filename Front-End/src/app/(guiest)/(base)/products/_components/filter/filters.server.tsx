import { getAttributesByCategory } from "@/actions/product.services";
import ProductFilter from "@/app/(guiest)/(base)/products/_components/filter/filters.client";

export default async function ProductFilterProps({
  category,
  brand,
}: {
  category: string;
  brand?: string;
}) {
  const filters = await getAttributesByCategory(category, brand);
  return <ProductFilter filters={filters} />;
}
