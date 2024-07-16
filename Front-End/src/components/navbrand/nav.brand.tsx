import { get } from "@/actions/axios.helper";
import { NavBrandButton } from "@/components/navbrand/nav.btn";
import Link from "next/link";

export default async function NavBrand({ category }: { category: string }) {
  const res = await get<BrandResponse[]>(`/brands/category/${category}`);
  const brands = res.data;
  return (
    <div className="w-full overflow-auto no-scrollbar">
      <div className="flex gap-3 justify-between items-center">
        <div className="flex gap-3">
          {brands.map((brand: BrandResponse) => (
            <Link
              key={`brand_${brand.id}`}
              href={`/products/${category}/${brand.name}.html`}
            >
              <NavBrandButton label={brand.name} />
            </Link>
          ))}
        </div>
        <div>
          <Link href={`/products/${category}.html`}>
            <NavBrandButton label="Xem tất cả" danger />
          </Link>
        </div>
      </div>
    </div>
  );
}
