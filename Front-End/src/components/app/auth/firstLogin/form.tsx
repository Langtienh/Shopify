"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { firstLoginByprovider } from "@/services/auth";
import { useAuth } from "@/contexts/auth.context";
import { AuthUser } from "@/auth/next-auth";
import { useSession } from "next-auth/react";

type FieldType = {
  fullName: string;
  email: string;
  agreement: boolean;
  phone: string;
};
const FirstLoginForm = ({ user }: { user: AuthUser }) => {
  const session = useSession();
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";
  const router = useRouter();
  const initialValues = {
    fullName: user.name,
    email: user.email,
    agreement: true,
  };
  const { updateUser } = useAuth();
  const [isPending, setPending] = useState<boolean>(false);
  const [form] = Form.useForm();
  // xử lý đăng kí
  const onFinish = async (values: Omit<FieldType, "agreement">) => {
    setPending(true);
    try {
      const input = {
        providerId: user.id,
        avatar: user.image,
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
      };
      const _user = await firstLoginByprovider(input);
      await session.update(_user);
      updateUser(_user);
      message.success("Cập nhật số điện thoại thành công");
      router.push(callbackUrl);
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Server error");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Spin spinning={isPending}>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        initialValues={initialValues}
        size="large"
      >
        <Form.Item<FieldType>
          name="fullName"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Vui lòng điền họ tên đầy đủ!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item<FieldType>
          name="email"
          rules={[
            {
              type: "email",
              message: "Sai định dạnh ví dụ phone@gmail.com",
            },
            {
              required: true,
              message: "Vui lòng điền email hoặc gmail!",
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item<FieldType>
          name="phone"
          rules={[{ required: true, message: "Vui lòng điền số điện thoại!" }]}
        >
          <Input type="phone" placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item<FieldType>
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
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default FirstLoginForm;
