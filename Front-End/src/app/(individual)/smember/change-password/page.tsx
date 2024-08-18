"use client";

import BackBtn from "@/components/app/auth/btn.back";
import { openNotification } from "@/lib/nofication";
import { updatePassword } from "@/services/auth";
import { Button, Form, Input, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onFinish = async (form: {
    newPassword: string;
    oldPassword: string;
  }) => {
    setLoading(true);
    const res = await updatePassword(form.oldPassword, form.newPassword);
    if (res.isSucsess) {
      openNotification({
        message: res.message,
        description: "Bạn sẽ được chuyển tới trang chủ trong vài giây nữa",
        notificationType: "success",
      });
      setTimeout(() => {
        router.push("/smember");
      }, 2000);
    } else
      openNotification({
        message: res.message,
        description: "Vui lòng thử lại",
        notificationType: "error",
      });
    setLoading(false);
  };
  return (
    <>
      <div className="flex gap-5 items-center">
        <BackBtn />
        <p className="text-[22px] font-bold py-2">Tạo mật khẩu mới</p>
      </div>
      <div className="py-5 flex">
        <Image
          className="mx-auto"
          src="/images/Shipper.png"
          alt="Shipper"
          width={200}
          height={200}
        />
      </div>
      <Spin spinning={isLoading}>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          size="large"
        >
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mật khẩu!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mật khẩu!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Xác nhận lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới mà bạn đã nhập không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger htmlType="submit" className="w-full">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
