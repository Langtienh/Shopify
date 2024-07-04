import Section from "@/components/home/section";
import { get } from "@/services/axios.helper";

export default async function Page() {
  try {
    const res = await get<ResponseSuccess<CategoryResponse[]>>("/categories");
    const categories = res.data.sort((a, b) => a.id - b.id);
    return (
      <div className="flex flex-col gap-3">
        {categories.map((category: CategoryResponse) => (
          <Section key={`category_${category.id}`} category={category} />
        ))}
      </div>
    );
  } catch {
    return <> error</>;
  }
}
