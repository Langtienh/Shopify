import { MenuDropdown } from "@/components/header/ui";
import {
  getAllCategory,
  getbrandsByCategory,
} from "@/actions/product.services";

const CategoryDropDown = async ({
  category,
}: {
  category: CategoryResponse;
}) => {
  const brands = await getbrandsByCategory(category.name);
  return <MenuDropdown category={category.name} brands={brands} />;
};

export default async function Header3() {
  const categories = await getAllCategory();
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
}
