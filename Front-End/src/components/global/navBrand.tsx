import { get } from "@/services/axios.helper";
import { NavBrandButton } from "@/components/home/client";
import Link from "next/link";

export default async function NavBrand({ category }: { category: TCategory }) {
  const brands = await get<TBrand[]>(`/brands?categoryId=${category.id}`);
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {brands.map((brand: TBrand) => (
            <Link
              key={`brand_${brand.id}`}
              href={`/${category.category}/${brand.brand}`}
            >
              <NavBrandButton label={brand.brand} />
            </Link>
          ))}
        </div>
        <div>
          <Link href={`/${category.category}`}>
            <NavBrandButton label="Xem tất cả" danger />
          </Link>
        </div>
      </div>
    </>
  );
}
