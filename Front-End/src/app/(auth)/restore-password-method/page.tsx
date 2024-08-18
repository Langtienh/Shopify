"use client";

import { Button, Form, Input } from "antd";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { verifyMail, verifyOTP } from "@/services/auth/action";
import { openNotification } from "@/lib/nofication";
import RenderIf from "@/components/global/renderif";
import { useRouter } from "next/navigation";
export default function Page() {
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSucsess, setSucsess] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const onFinish = async (form: { email: string }) => {
    setLoading(true);
    const res = await verifyMail(form.email);
    if (res) {
      setEmail(form.email);
      setSucsess(true);
    }
    setLoading(false);
  };
  const router = useRouter();
  const handleSubmit = async () => {
    const res = await verifyOTP(email, otp);
    if (res.message)
      openNotification({
        message: res.message,
        description: "",
        notificationType: "error",
      });
    else router.push("/restore-password");
    setOtp("");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-between">
        <Image
          className="mx-auto"
          src="/images/Shipper.png"
          alt="Shipper"
          width={100}
          height={100}
        />
        <p className="text-[22px] font-bold py-2">Quên mật khẩu</p>
      </div>
      <div className="mb-10 p-[10px]">
        <p className="text-[#777] text-[13px] text-center mb-5">
          Hãy nhập email của bạn vào bên dưới để bắt đầu quá trình khôi phục mật
          khẩu.
        </p>
        <Form
          name="email"
          form={form}
          onFinish={onFinish}
          scrollToFirstError
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Sai định dạnh ví dụ user@gmail.com!",
              },
              {
                required: true,
                message: "Vui lòng điền tài khoản email của bạn!",
              },
            ]}
          >
            <Input placeholder="user@gmail.com" className="w-full" allowClear />
          </Form.Item>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                htmlType="submit"
                className="w-full"
                danger
                type="primary"
              >
                Tiếp tục
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
              <DialogHeader>
                <DialogTitle className="p-5 text-xl font-medium bg-gray-100 text-center">
                  Xác thực Số điện thoại
                </DialogTitle>
              </DialogHeader>
              <RenderIf renderIf={isLoading}>
                <div className="px-5 pt-5 mb-5">
                  <p className="text-lg text-center">Đang xác nhận...</p>
                  <div className="w-[200px] mx-auto py-5">
                    <Input.OTP disabled length={4} size="large" />
                  </div>
                  <DialogClose asChild>
                    <Button
                      className="w-full"
                      danger
                      type="primary"
                      size="large"
                    >
                      Đóng
                    </Button>
                  </DialogClose>
                </div>
              </RenderIf>
              <RenderIf renderIf={isSucsess && !isLoading}>
                <div className="px-5 pt-5 mb-5">
                  <p className="text-lg text-center">{`Nhập mã OTP được gửi qua email ${email}`}</p>
                  <div className="w-[200px] mx-auto py-5">
                    <Input.OTP
                      length={4}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                      size="large"
                    />
                  </div>
                  <Button
                    disabled={otp.length !== 4}
                    className="w-full"
                    danger
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                  >
                    Xác nhận
                  </Button>
                  <p className="text-center text-[13px] text-gray-500 py-3">
                    Mã OTP có hiệu lực trong vòng 5 phút
                  </p>
                </div>
              </RenderIf>
              <RenderIf renderIf={!isLoading && !isSucsess}>
                <div className="px-5 pt-5 mb-5">
                  <p className="text-lg text-center">
                    Không tìm thấy tài khoản
                  </p>
                  <div className="w-[200px] mx-auto py-5">
                    <Input.OTP disabled length={4} size="large" />
                  </div>
                  <DialogClose asChild>
                    <Button
                      className="w-full"
                      danger
                      type="primary"
                      size="large"
                    >
                      Đóng
                    </Button>
                  </DialogClose>
                </div>
              </RenderIf>
            </DialogContent>
          </Dialog>
        </Form>
      </div>
    </>
  );
}
