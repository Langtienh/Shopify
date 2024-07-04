import { get } from "@/services/axios.helper";
import { NavBrandButton } from "@/components/global/client";
import Link from "next/link";

export default async function NavBrand({ category }: { category: string }) {
  try {
    const res = await get<ResponseSuccess<BrandResponse[]>>(
      `/brands/category/${category}`
    );
    const brands = res.data;
    return (
      <>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {brands.map((brand: BrandResponse) => (
              <Link
                key={`brand_${brand.id}`}
                href={`/${category}/${brand.name}`}
              >
                <NavBrandButton label={brand.name} />
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
  } catch {
    return <> error</>;
  }
}
