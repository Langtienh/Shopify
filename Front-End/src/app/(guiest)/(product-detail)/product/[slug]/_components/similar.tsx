import { limitProductByCategory } from "@/lib/ultils";
import { getProductByCategorySortByViewCounter } from "@/services/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductItem from "@/components/product/item/product.item";

export default async function Similar({ category }: { category: string }) {
  const products = await getProductByCategorySortByViewCounter(category, 10);
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <h2 className="font-bold text-lg pt-4">SẢN PHẨM TƯƠNG TỰ</h2>
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
    </div>
  );
}
