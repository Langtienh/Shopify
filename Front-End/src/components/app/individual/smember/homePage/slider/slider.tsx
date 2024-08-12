import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductItem from "@/components/app/individual/smember/homePage/product.item";
// import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { getWishList } from "@/services/wish-list";

export default async function Slider() {
  const data = await getWishList();
  // const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const isShow = data?.length;
  if (isShow)
    return (
      <>
        <h2 className="text-xl font-bold py-2">Sản phẩm yêu thích của bạn</h2>
        <div className="overflow-hidden px-1">
          <Carousel>
            {/* <Carousel plugins={[plugin.current]}> */}
            <CarouselContent className="-ml-2">
              {data?.length &&
                data.map((item) => (
                  <CarouselItem
                    className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4"
                    key={`wishlist-${item.id}`}
                  >
                    <ProductItem product={item} />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2 opacity-100 size-12 bg-white shadow-sm border" />
            <CarouselNext className="right-0 translate-x-1/2 opacity-100 size-12 bg-white shadow-sm border" />
          </Carousel>
        </div>
      </>
    );
  return <></>;
}
