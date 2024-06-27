import { get } from "@/services/axios.helper";
import { MenuDropdown } from "@/components/header/ui";

const CategoryDropDown = async ({ category }: { category: TCategory }) => {
  const brands = await get<TBrand[]>(`/brands?category=${category.category}`);
  return <MenuDropdown category={category.category} brands={brands} />;
};

export default async function Header2() {
  const categories = await get<TCategory[]>("/categories");
  return (
    <div className=" bg-[#252525]">
      <div className="max-w-[1200px] mx-auto px-1 flex justify-between">
        {categories.map((category: TCategory) => (
          <CategoryDropDown
            key={`category_${category.id}`}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
