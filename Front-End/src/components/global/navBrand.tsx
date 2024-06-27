import { get } from "@/services/axios.helper";
import { NavBrandButton } from "@/components/home/client";
import Link from "next/link";

export default async function NavBrand({
  category,
  params,
}: {
  category: string;
  params?: { brand?: string };
}) {
  const brands = await get<TBrand[]>(`/brands?category=${category}`);
  const active = params?.brand;
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {brands.map((brand: TBrand) => (
            <Link
              key={`brand_${brand.id}`}
              href={`/${category}/${brand.brand}`}
            >
              <NavBrandButton active={active} label={brand.brand} />
            </Link>
          ))}
        </div>
        <div>
          <Link href={`/${category}`}>
            <NavBrandButton label="Xem tất cả" danger />
          </Link>
        </div>
      </div>
    </>
  );
}
