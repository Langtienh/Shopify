"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import Link from "next/link";
import { register } from "@/services/auth";
import { openNotification } from "@/lib/nofication";
import { useRouter } from "next/navigation";
import { DELAY } from "@/lib/utils2";
import { Address } from "./selectAddress";

const RegesterForm: React.FC = () => {
  const [form] = Form.useForm();
  // xử lý đăng kí
  const router = useRouter();
  const onFinish = async (values: RegisterForm) => {
    setLoading(true);
    const res = await register(values);
    if (res.status === 201) {
      openNotification({
        message: res.message || "Đăng kí thành công",
        description: "Đăng nhập để tiếp tục",
        notificationType: "success",
      });
      await DELAY(1000);

      router.push("/login");
    } else {
      openNotification({
        message: res.message || "Đăng kí thất bại",
        description: "Tài khoản đã tồn tại hoặc không hợp lệ",
        notificationType: "error",
      });
    }
    setLoading(false);
  };
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        size="large"
      >
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Vui lòng điền họ tên đầy đủ!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Vui lòng điền số điện thoại!" }]}
        >
          <Input type="phone" placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Sai định dạnh ví dụ user@gmail.com",
            },
            {
              required: true,
              message: "Vui lòng điền email!",
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="avatar"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm ảnh đại diện!",
              whitespace: true,
            },
          ]}
        >
          <Input
            allowClear
            placeholder="Địa chỉ ảnh đại diện ví dụ https://My Avata.png"
          />
        </Form.Item>
        <Address />
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

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Vui lòng đọc và chấp nhận thỏa thuận")
                    ),
            },
          ]}
        >
          <Checkbox>
            <span className="">
              Tôi đồng ý với các điều khoản bảo mật cá nhân
            </span>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" danger htmlType="submit" className="w-full">
            Đăng kí
          </Button>
        </Form.Item>
        <p className="text-center my-5">
          <span className="font-semibold text-sm text-gray-500">
            Đã có có tài khoản
          </span>{" "}
          <Link className="text-red-500 font-bold" href="/login">
            Đăng nhập
          </Link>
        </p>
      </Form>
    </Spin>
  );
};

export default RegesterForm;
