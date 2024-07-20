"use client";
import { Alert, Button, Image as AntdImage, QRCode, Carousel } from "antd";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { NavSmemverData } from "./_lib/data";

export default function Page() {
  const session = useSession();
  const user = session.data?.user;
  const isSucsess = user && user?.phone && user?.avatar && user?.fullName;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-wrap gap-4">
          {isSucsess && (
            <div className="flex gap-4 items-center w-full">
              <div className="size-[74px] flex-shrink-0 rounded-full border-2 border-purple-800 bg-white">
                {user.avatar && (
                  <AntdImage
                    className="rounded-full"
                    width={70}
                    height={70}
                    src={user.avatar}
                    alt="avatar"
                  />
                )}
              </div>
              <div className="flex-1 w-full flex flex-col gap-1">
                <h2 className="text-[24px] font-bold text-[#ac3c8e]">
                  {user.fullName}
                </h2>
                <p className="text-gray-500 text-sm">{user.phone}</p>
              </div>
              <span className="ms-auto text-red-600 font-bold py-1 px-3 border-2 border-red-600 rounded-xl">
                Smember
              </span>
            </div>
          )}

          <div className="p-[10px] w-full mt-auto rounded-xl bg-white border grid grid-cols-2">
            <div className="text-center border-r">
              <div className="text-[28px] font-bold my-2">0</div>
              <div className="text-sm">Đơn hàng</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold my-2">0đ</div>
              <div className="text-sm">Tổng tiền tích lũy</div>
            </div>
          </div>
        </div>
        <div className="p-[10px] rounded-xl bg-white border flex flex-col justify-center items-center gap-4">
          <p className="text-center text-sm text-gray-500">
            Đưa mã này cho nhân viên để hưởng ưu đãi Smember
          </p>
          <QRCode value="http://localhost:3000" />
        </div>
      </div>
      <Alert
        message="Hồ sơ S-Student của bạn chưa hợp lệ. Vui lòng cập nhật lại."
        type="error"
        showIcon
        action={
          <Button type="primary" danger>
            Xem lý do
          </Button>
        }
      />
      <Alert
        message="Cập nhật thông tin cá nhân và địa chỉ để có trải nghiệm đặt hàng nhanh và thuận tiện hơn."
        type="info"
        showIcon
        action={<Button type="primary">Cập nhật</Button>}
      />
      <div className="p-[10px] flex flex-wrap justify-between gap-4 bg-white rounded-xl border">
        {NavSmemverData.map(
          (item) =>
            item.isNew && (
              <div
                className="flex-auto flex-shrink-0 flex flex-col gap-1 items-center justify-center"
                key={item.label}
              >
                <div className="size-10 rounded-full bg-[#e7f1fe] flex items-center justify-center">
                  <Image
                    src={item.icon}
                    width={24}
                    height={24}
                    alt={item.label}
                  />
                </div>
                <div className="w-full text-sm text-center">{item.label}</div>
              </div>
            )
        )}
      </div>
      <div className="bg-[#fff5e5] rounded-xl border p-4">
        <p className="pb-3 font-bold text-xl">Chương trình nổi bật</p>
        <div className="grid lg:grid-cols-2 gap-4">
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
            <Carousel arrows>
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
    </div>
  );
}
