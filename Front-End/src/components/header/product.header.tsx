import Header2 from "@/components/header/header2";
import Header3 from "@/components/header/header3";
import Breadcrumb from "@/components/ui/breadcrumb";
import BreadcrumbCustom from "@/components/ui/breadcrumb.custom";

export default async function ProductHeader({
  product,
}: {
  product: ProductResponse;
}) {
  return (
    <div className="fixed top-0 w-full max-w-[1400px] mx-auto z-10">
      <Header2 />
      <Header3 />
      <BreadcrumbCustom product={product} />
    </div>
  );
}
