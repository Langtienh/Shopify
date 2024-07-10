import { get } from "@/actions/axios.helper";
import { NavBrandButton } from "@/components/global/client";
import { categoryToSlug, slugToCategoryEn } from "@/lib/ultils";
import Link from "next/link";

export default async function NavBrand({ category }: { category: string }) {
  const res = await get<BrandResponse[]>(
    `/brands/category/${slugToCategoryEn(category)}`
  );
  const brands = res.data;
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {brands.map((brand: BrandResponse) => (
            <Link
              key={`brand_${brand.id}`}
              href={`/${categoryToSlug(category)}/${brand.name}`}
            >
              <NavBrandButton label={brand.name} />
            </Link>
          ))}
        </div>
        <div>
          <Link href={`/${categoryToSlug(category)}`}>
            <NavBrandButton label="Xem tất cả" danger />
          </Link>
        </div>
      </div>
    </>
  );
}
