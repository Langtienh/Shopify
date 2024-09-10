import { Alert, Button, QRCode } from "antd";
import Slider from "@/components/app/individual/smember/homePage/slider";
import Carousels from "@/components/app/individual/smember/homePage/carousel";
import Nav from "@/components/app/individual/smember/homePage/nav";
import Profile from "@/components/app/individual/smember/user.info";
import { Suspense } from "react";
import WishListSkeleton from "@/components/app/individual/smember/homePage/slider/skeleton";
import Link from "next/link";
import { getMyInfo } from "@/services/user";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Profile />
        <div className="p-[10px] rounded-xl bg-white border flex flex-col justify-center items-center gap-4">
          <p className="text-center text-sm text-gray-500">
            Đưa mã này cho nhân viên để hưởng ưu đãi Smember
          </p>
          <QRCode value="https://langtienk4-shopify.vercel.app" />
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
        action={
          <Link href="/smember/user-info">
            <Button type="primary">Cập nhật</Button>
          </Link>
        }
      />
      <Nav />
      <Suspense fallback={<WishListSkeleton />}>
        <Slider />
      </Suspense>
      <Carousels />
    </div>
  );
}
