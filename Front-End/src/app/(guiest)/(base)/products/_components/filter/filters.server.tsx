import { getAttributesByCategory } from "@/actions/product.services";
import ProductFilterClient from "@/app/(guiest)/(base)/products/_components/filter/filters.client";

export default async function ProductFilter({
  category,
  brand,
}: {
  category: string;
  brand?: string;
}) {
  const filters = await getAttributesByCategory(category, brand);
  return <ProductFilterClient filters={filters} />;
}
