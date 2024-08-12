import { limitProductByCategory } from "@/lib/utils2";
import { getProductByCategorySortByViewCounter } from "@/services/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ProductItem } from "@/components/global/product";

export default async function ProductTop({
  category,
}: {
  category: CategoryResponse;
}) {
  const LIMIT = limitProductByCategory(category.id);
  const products = await getProductByCategorySortByViewCounter(
    category.name,
    LIMIT
  );
  const isDouble = LIMIT > 20;
  if (isDouble) {
    const products1 = products.filter((_, i) => i < LIMIT / 2);
    const products2 = products.filter((_, i) => i >= LIMIT / 2);
    return (
      <div className="py-2 ps-2 rounded-lg overflow-hidden">
        <Carousel>
          <CarouselContent className="-ml-2 pr-[10px]">
            {products1.map((_, i) => (
              <CarouselItem
                className="pl-2 basis-1/2  md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                key={`product_${i}`}
              >
                <div className="flex flex-col gap-2">
                  {products1[i] && <ProductItem product={products1[i]} />}
                  {products2[i] && <ProductItem product={products2[i]} />}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute z-10 left-0 -translate-x-1/2 size-12 bg-white shadow-sm border" />
          <CarouselNext className="absolute z-10 right-0 translate-x-1/2 size-12 bg-white shadow-sm border" />
        </Carousel>
      </div>
    );
  }
  return (
    <div className="py-2 ps-2 rounded-lg overflow-hidden">
      <Carousel>
        <CarouselContent className="-ml-2 pr-[10px]">
          {products.map((product: ProductResponse) => (
            <CarouselItem
              className="pl-2 basis-1/2  md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              key={`product_${product.id}`}
            >
              <ProductItem product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute z-10 left-0 -translate-x-1/2 opacity-100 size-12 bg-white shadow-sm border" />
        <CarouselNext className="absolute z-10 right-0 translate-x-1/2 opacity-100 size-12 bg-white shadow-sm border" />
      </Carousel>
    </div>
  );
}
