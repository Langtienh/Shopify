import { getAttributesByCategory } from "@/services/product";
import ProductFilterClient from "./client";

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
