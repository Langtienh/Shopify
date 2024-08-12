"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { productImage } from "@/hard-coding/data";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { CiStar } from "react-icons/ci";
import { WishListButton } from "@/components/global/product";

type PropsType = {
  name: string;
  image: string;
  productId: number;
};

export default function Slider({ name, image, productId }: PropsType) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <>
      <div className="h-[400px] relative">
        <Carousel plugins={[plugin.current]}>
          <CarouselContent>
            <CarouselItem>
              <div className="relative overflow-hidden h-fulloverflow-hidden rounded-xl border border-gray-200 shadow-lg">
                <div
                  style={{
                    background: "linear-gradient(90deg, #dd5e89, #f7bb97)",
                  }}
                  className="h-[400px] gap-4 flex items-center px-4"
                >
                  <div className="flex-1">
                    <div className="p-3 text-center bg-white rounded-xl">
                      <Image
                        className="object-cover rounded-xl aspect-square"
                        height={250}
                        width={250}
                        src={image}
                        alt={name}
                      />
                    </div>
                  </div>
                  <div className="text-white h-[270px] w-2/3 flex flex-col justify-center">
                    <p className="font-bold text-center text-[18px]">
                      Tính năng nổi bật
                    </p>{" "}
                    <div className="sm:text-sm text-[12px]">
                      <ul className="list-inside list-disc">
                        <li>
                          Chip Snapdragon 8 Gen 1 cho hiệu suất mạnh mẽ, cân mọi
                          tác vụ từ giải trí đến làm việc
                        </li>
                        <li>
                          Màn hình AMOLED 120 Hz mang đến cho bạn trải nghiệm
                          mượt mà, màu sắc sống động
                        </li>
                        <li>
                          Dùng thoải mái cả ngày với dung lượng pin 5.000 mAh,
                          tích hợp sạc nhanh 80W hiện đại
                        </li>
                        <li>
                          RAM 12GB đảm bảo khả năng xử lý đa nhiệm không giật
                          lag, ROM 256GB giúp lưu trữ tốt
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            {productImage.map((item, index) => (
              <CarouselItem key={`${item}-${index}`}>
                <div
                  className="overflow-hidden rounded-xl
            border border-gray-200 shadow-lg w-full h-[400px]"
                >
                  <Image
                    className="object-contain h-full mx-auto"
                    height={400}
                    width={700}
                    src={item}
                    alt={`slider`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute top-2 left-2">
          <WishListButton productId={productId} />
        </div>
      </div>
      <div className="pt-[10px] flex gap-[10px] overflow-scroll no-scrollbar">
        <div
          className="basis-[60px] flex-shrink-0 size-[60px] overflow-hidden rounded-xl
            border border-gray-200 shadow-lg w-full flex flex-col items-center justify-center"
        >
          <span className="text-[12px] font-bold text-gray-300 text-center gap-1">
            <CiStar size={26} className="mx-auto" />
            Tính năng nổi bật
          </span>
        </div>
        {productImage.map((item, index) => (
          <div
            key={`${item}-${index}-small`}
            className="basis-[60px] flex-shrink-0 size-[60px] overflow-hidden rounded-xl
            border border-gray-200 shadow-lg w-full flex items-center justify-center p-1"
          >
            <Image
              className="object-fill"
              height={60}
              width={60}
              src={item}
              alt={`slider`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
