"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductItem from "../product.item";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function SliderClient({ wishlist }: { wishlist: WishList[] }) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent className="-ml-2">
        {wishlist?.length &&
          wishlist.map((item) => (
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
  );
}
