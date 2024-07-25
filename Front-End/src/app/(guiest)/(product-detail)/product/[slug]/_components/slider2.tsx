"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { smartphoneSlider } from "@/hard-coding/data";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function Slider2() {
  const plugin = useRef(Autoplay({ delay: 4000 }));
  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent>
        {smartphoneSlider.map((item, index) => (
          <CarouselItem key={`${item}-${index}`}>
            <Image
              className="object-fill h-full w-full rounded-lg min-w-[60px]"
              quality={100}
              height={100}
              width={700}
              src={item}
              alt={`slider`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
