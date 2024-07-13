import { getAttributesByCategory } from "@/actions/product.services";
import ProductFilter from "@/components/product/filter/product.filters";

export default async function ProductFilterProps({
  category,
  brands,
}: {
  category: string;
  brands?: string;
}) {
  const filters = await getAttributesByCategory(category, brands);
  return <ProductFilter filters={filters} />;
}
