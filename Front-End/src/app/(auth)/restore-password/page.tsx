"use client";

import useAction from "@/hooks/useAction";
import { resetPassword } from "@/services/auth";
import { Button, Form, Input, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [form] = Form.useForm();
  const [resetPasswordReponse, isPending, _resetPassword] =
    useAction(resetPassword);
  const router = useRouter();
  const onFinish = async (form: { password: string }) => {
    const res = await _resetPassword(form.password);
    if (res) {
      router.push("/login");
    }
  };
  return (
    <>
      <Spin spinning={isPending}>
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
