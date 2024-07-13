import { MenuDropdown } from "@/components/header/ui/ui.memu.dropdown";
import NavCategoryMobile from "@/components/header/ui/ui.category.nav";
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
    // <div className=" bg-[#252525]">
    <div className=" bg-[#d70018]">
      <div className="max-w-[1200px] mx-auto px-[10px] hidden md:block">
        <div className="flex justify-between border-t border-white">
          {categories.map((category: CategoryResponse) => (
            <CategoryDropDown
              key={`category_${category.id}`}
              category={category}
            />
          ))}
        </div>
      </div>
      <div className="relative text-white max-w-[1200px] mx-auto px-[10px] h-9 md:hidden justify-between">
        <NavCategoryMobile categories={categories} />
      </div>
    </div>
  );
}
