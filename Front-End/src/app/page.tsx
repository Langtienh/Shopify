import Section from "@/components/home/section";
import { get } from "@/services/axios.helper";

export default async function Page() {
  const categories = await get<TCategory[]>("/categories");
  return (
    <div className="flex flex-col gap-3">
      {categories.map((category: TCategory) => (
        <Section key={`category_${category.id}`} category={category} />
      ))}
    </div>
  );
}
