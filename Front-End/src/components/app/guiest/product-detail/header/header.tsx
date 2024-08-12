import { Header2, Header3 } from "@/components/global/header";
import BreadcrumbCustom from "./breadcrumb.custom";
import { Suspense } from "react";

export default async function ProductDetailHeader({
  productId,
}: {
  productId: number;
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
