import { getAllCategory } from "@/services/category";
import { FilterByCategory } from "./button";

export default async function Filter({
  category,
}: {
  category: string | undefined;
}) {
  const categories = await getAllCategory();
  return (
    <>
      <FilterByCategory category={category} categories={categories} />
    </>
  );
}
