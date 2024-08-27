"use client";

import { resetPassword } from "@/services/auth";
import { Button, Form, Input, message, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onFinish = async (form: { password: string }) => {
    setLoading(true);
    const res = await resetPassword(form.password);
    if (!res.isError) {
      message.success(res.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else message.error(res.message);
    setLoading(false);
  };
  return (
    <>
      <Spin spinning={isLoading}>
        <div className="flex flex-col items-center justify-between">
          <Image
            className="mx-auto"
            src="/images/Shipper.png"
            alt="Shipper"
            width={100}
            height={100}
          />
          <p className="text-[22px] font-bold py-2">Tạo mật khẩu mới</p>
        </div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          size="large"
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mật khẩu!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Xác nhận lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới mà bạn đã nhập không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
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
