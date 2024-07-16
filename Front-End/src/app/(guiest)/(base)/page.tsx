import Section from "@/app/(guiest)/_components/home/section";
import { getAllCategory } from "@/actions/product.services";
import { Suspense } from "react";
import Loading from "@/app/loading";

export default async function Page() {
  // todo

  const categories = await getAllCategory();
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-3">
        {categories.map((category: CategoryResponse) => (
          <Section key={`category_${category.id}`} category={category} />
        ))}
      </div>
    </Suspense>
  );
}
