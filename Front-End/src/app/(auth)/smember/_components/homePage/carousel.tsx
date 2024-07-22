import { Carousel } from "antd";
import Image from "next/image";

export default function Carousels() {
  return (
    <div className="bg-[#fff5e5] rounded-xl border p-4">
      <p className="pb-3 font-bold text-xl">Chương trình nổi bật</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full rounded-xl overflow-hidden">
          <Carousel autoplay arrows={false} dots={false}>
            {Array.from({ length: 5 }, (_, i) => (
              <Image
                className="w-full"
                width={360}
                height={360}
                key={`slider-${i}`}
                src={`/images/smember/slider/slider${i + 1}.webp`}
                alt="slider"
              />
            ))}
          </Carousel>
        </div>
        <div className="w-full rounded-xl overflow-hidden">
          <Carousel arrows autoplay autoplaySpeed={5000}>
            {Array.from({ length: 5 }, (_, i) => (
              <Image
                className="w-full"
                width={360}
                height={360}
                key={`slider-${i}`}
                src={`/images/smember/slider/slider${i + 1}.webp`}
                alt="slider"
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
