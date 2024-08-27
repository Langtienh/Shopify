"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { IUser } from "@/auth/next-auth";
import { firstLoginByprovider } from "@/services/auth";
import { useAppDispatch } from "@/redux/store";
import { updateUserInfo } from "@/redux/user-info/slice";

type FieldType = {
  fullName: string;
  email: string;
  agreement: boolean;
  phone: string;
};
const FirstLoginForm = ({ user }: { user: IUser }) => {
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";
  const router = useRouter();
  const session = useSession();
  const initialValues = {
    fullName: user?.fullName,
    email: user?.email,
    agreement: true,
  };
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  // xử lý đăng kí
  const onFinish = async (values: Omit<FieldType, "agreement">) => {
    setLoading(true);
    const input = {
      providerId: user?.providerId!,
      avatar: user.avatar!,
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
    };
    const res = await firstLoginByprovider(input);
    if (!res.isError) {
      message.success(res.message);
      const data = res.data;
      dispatch(updateUserInfo(data.user));
      await session.update(data);
      router.push(callbackUrl);
    } else {
      message.error(res.message);
      return null;
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
