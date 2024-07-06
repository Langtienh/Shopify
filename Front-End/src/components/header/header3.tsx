import { get } from "@/services/axios.helper";
import { MenuDropdown } from "@/components/header/ui";

const CategoryDropDown = async ({
  category,
}: {
  category: CategoryResponse;
}) => {
  try {
    const res = await get<ResponseSuccess<BrandResponse[]>>(
      `/brands/category/${category.name}`
    );
    const brands = res.data;
    return <MenuDropdown category={category.name} brands={brands} />;
  } catch {
    return <> error</>;
  }
};

export default async function Header3() {
  try {
    const res = await get<ResponseSuccess<CategoryResponse[]>>("/categories");
    const categories = res.data;
    return (
      <div className=" bg-[#252525]">
        <div className="max-w-[1200px] mx-auto px-1 flex justify-between">
          {categories.map((category: CategoryResponse) => (
            <CategoryDropDown
              key={`category_${category.id}`}
              category={category}
            />
          ))}
        </div>
      </div>
    );
  } catch {
    return <> error</>;
  }
}
