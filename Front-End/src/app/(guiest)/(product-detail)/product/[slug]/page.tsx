import { getAllProduct, getProductById } from "@/actions/product.services";
import {
  priceShow,
  priceThrough,
  productSlugToId,
  productToSlug,
  view,
} from "@/lib/ultils";
import { Carousel, Image, Rate } from "antd";
import { productImage, smartphoneSlider } from "@/hard-coding/data";
import AddProductToCart from "@/components/product/button/btn.addToCart";
import { MdCurrencyExchange } from "react-icons/md";

export async function generateStaticParams() {
  let products = await getAllProduct(500);
  products = products.filter(
    (item) => item.category.toLowerCase() === "smartphone"
  );
  return products.map((product) => ({
    slug: productToSlug(product),
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const productId = productSlugToId(params.slug);
  const product = await getProductById(productId);
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <h1 className="w-full text-[18px] text-[#0a263c] font-bold text-ellipsis">
          {product.name}{" "}
          <Rate
            className="flex gap-0 items-center *:mr-0 text-[rgb(245,158,11)] *:text-[14px] *:m-0 *:p-0"
            allowHalf
            defaultValue={4.5}
          />{" "}
          <span className="text-sm text-nowrap font-normal">
            {view(product)} Đánh giá
          </span>
        </h1>
        <div className="flex flex-wrap gap-y-5 md:flex-nowrap">
          <div className="xl:w-2/3 md:w-1/2 w-full flex-1 md:pr-5">
            <Carousel dots={false} arrows infinite={false}>
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
                        // height={400}
                        src={product.image}
                        alt={product.name}
                        fallback="/productError.png"
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
                <div className="absolute bottom-1/2 translate-y-1/2 translate-x-1/2 right-0 p-10 rounded-full bg-black opacity-40"></div>
              </div>
              {productImage.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="relative h-full text-center overflow-hidden rounded-xl border border-gray-200 shadow-lg"
                >
                  <Image
                    className="object-cover"
                    height={400}
                    src={item}
                    alt={`slider`}
                    fallback="/productError.png"
                  />
                  <div className="absolute bottom-1/2 translate-y-1/2 -translate-x-1/2 left-0 p-10 rounded-full bg-black opacity-40"></div>
                  <div className="absolute bottom-1/2 translate-y-1/2 translate-x-1/2 right-0 p-10 rounded-full bg-black opacity-40"></div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="xl:w-1/3 md:w-1/2 w-full flex flex-col h-[400px] gap-[10px] text-white">
            <div className="h-[60px] rounded-lg ">
              <Carousel dots={false} autoplay infinite arrows={false}>
                {smartphoneSlider.map((item, index) => (
                  <Image
                    className="rounded-lg w-full"
                    preview={false}
                    height={60}
                    key={`${item}-${index}`}
                    src={item}
                    alt="slider"
                    fallback="/smartphone/smartphone-slider.webp"
                  />
                ))}
              </Carousel>
            </div>
            <div className="h-[60px]rounded-lg bg-[#eeeeef] flex gap-3 p-[5px]">
              <div className="text-gray-700 flex-1 gap-3 h-full flex justify-center items-center hover:bg-white rounded-lg">
                <MdCurrencyExchange size={30} />
                <div>
                  <p className="font-bold text-center">10.000.000đ</p>
                  <p className="text-sm">Khi thu cũ lên đời</p>
                </div>
              </div>
              <div className="text-gray-700 flex-1 h-full flex flex-col justify-center items-center border-[2px] border-red-600 bg-white rounded-lg">
                <p className="font-bold text-center text-red-600">
                  {priceShow(product)}
                </p>
                <p className="line-through text-sm">{priceThrough(product)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-full">
                <BtnCustom
                  color="bg-[#f22c2f]"
                  title="Mua ngay"
                  description="Giao nhanh trong 2h hoặc nhận tại cửa hàng"
                />
              </div>
              <div className="flex-grow-0 flex-shrink-0">
                <AddProductToCart productId={product.id} />
              </div>
            </div>
            <div className="flex gap-3">
              <BtnCustom
                color="bg-[#3678d5]"
                title="Trả góp 0%"
                description={`Trả trước chỉ từ ${priceShow({
                  ...product,
                  price: product.price / 10,
                })}`}
              />
              <BtnCustom
                color="bg-[#3678d5]"
                title="Trả góp 0% qua thẻ"
                description="Chuyển đổi 3-6 tháng"
              />
            </div>

            <BtnCustom
              color="bg-[#ec8104]"
              title="Thu cũ lên đời"
              description={`Chỉ từ ${priceShow(product)}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const BtnCustom = ({
  color,
  title,
  description,
}: {
  color: string;
  title: string;
  description: string;
}) => {
  return (
    <button
      className={`w-full rounded-xl ${color} font-bold p-[5px] text-white`}
    >
      <p>{title}</p>
      <p className="text-[12px]">{description}</p>
    </button>
  );
};
