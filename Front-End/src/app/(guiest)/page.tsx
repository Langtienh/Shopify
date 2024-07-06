import Section from "@/components/home/section";
import { getAllCategory } from "@/actions/product.services";

export default async function Page() {
  const categories = await getAllCategory();
  return (
    <div className="flex flex-col gap-3">
      {categories.map((category: CategoryResponse) => (
        <Section key={`category_${category.id}`} category={category} />
      ))}
    </div>
  );
}
