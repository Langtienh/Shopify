import Header2 from "@/components/header/header2";
import Header3 from "@/components/header/header3";
import BreadcrumbCustom from "@/app/(guiest)/(product-detail)/_components/header/breadcrumb.custom";
import { Suspense } from "react";

export default async function ProductHeader({
  productId,
}: {
  productId: string;
}) {
  return (
    <div className="fixed top-0 w-full z-30">
      <Header2 />
      <Header3 />
      <Suspense
        fallback={
          <div className=" bg-white shadow-md h-[30px] w-full">Loading...</div>
        }
      >
        <BreadcrumbCustom productId={productId} />
      </Suspense>
    </div>
  );
}
