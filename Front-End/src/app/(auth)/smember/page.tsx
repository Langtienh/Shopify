import { Alert, Button, QRCode } from "antd";
import Slider from "@/app/(auth)/smember/_components/homePage/slider";
import Carousels from "@/app/(auth)/smember/_components/homePage/carousel";
import UserInfo from "@/app/(auth)/smember/_components/homePage/info";
import Nav from "@/app/(auth)/smember/_components/homePage/nav";
import Profile from "./_components/user.info";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-2 gap-4">
        {/* <div className="flex flex-wrap gap-4">
          <UserInfo />

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
        </div> */}
        <Profile />
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
      <Nav />
      <Slider />
      <Carousels />
    </div>
  );
}
