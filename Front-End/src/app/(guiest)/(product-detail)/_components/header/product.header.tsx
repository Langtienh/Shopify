import Header2 from "@/components/header/header2";
import Header3 from "@/components/header/header3";
import BreadcrumbCustom from "@/app/(guiest)/(product-detail)/_components/header/breadcrumb.custom";

export default async function ProductHeader({
  product,
}: {
  product: ProductResponse;
}) {
  return (
    <div className="fixed top-0 w-full max-w-[1400px] mx-auto z-30">
      <Header2 />
      <Header3 />
      <BreadcrumbCustom product={product} />
    </div>
  );
}
