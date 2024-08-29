"use client";
import React, { useState } from "react";
import { Button, Form, FormProps, Input, message, Spin } from "antd";
import Link from "next/link";
import { IUser } from "@/auth/next-auth";
import { CiEdit } from "react-icons/ci";
import { updateUser } from "@/services/user";

type FieldType = {
  fullName: string;
  email: string;
  phone: string;
};

export default function UpdateUserForm({
  user,
  addressDefault,
}: {
  user: User;
  addressDefault?: string;
}) {
  const [isEditFullName, setEditFullName] = useState<boolean>(false);
  const [isEditEmail, setEditEmail] = useState<boolean>(false);

  // hard code
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  // khởi tạo giá trị mặc định
  const initialValues = {
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
  };

  const [form] = Form.useForm();
  // xử lý đăng kí
  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    setEditEmail(false);
    setEditFullName(false);
    setLoading(true);
    const res = await updateUser(values);
    if (res.isError) message.error(res.message);
    else message.success(res.message);
    setLoading(false);
  };

  // xử lý trước upload

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
        size="large"
        initialValues={initialValues}
      >
        <div className="flex gap-5">
          <Form.Item<FieldType>
            className="flex-1"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Vui lòng điền họ tên đầy đủ!",
                whitespace: true,
              },
            ]}
          >
            <Input disabled={!isEditFullName} placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => setEditFullName(true)}
              htmlType="button"
              className="w-full"
              icon={<CiEdit />}
            />
          </Form.Item>
        </div>
        <div className="flex gap-5">
          <Form.Item<FieldType>
            name="phone"
            rules={[
              { required: true, message: "Vui lòng điền số điện thoại!" },
            ]}
            className="flex-1"
          >
            <Input disabled type="phone" placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item>
            <div className="size-10" />
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <Form.Item<FieldType>
            className="flex-1"
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
            <Input disabled={!isEditEmail} placeholder="Nhập email" />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => setEditEmail(true)}
              htmlType="button"
              className="w-full"
              icon={<CiEdit />}
            />
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <Form.Item className="flex-1">
            <Input disabled value={`Ngày tham gia Smember: ${formattedDate}`} />
          </Form.Item>
          <Form.Item>
            <div className="size-10" />
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <Form.Item className="flex-1">
            <Input disabled value={`Tổng tiền đã mua sắm: ${0}đ`} />
          </Form.Item>
          <Form.Item>
            <div className="size-10" />
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <Form.Item className="flex-1">
            <Input
              disabled
              value={`Địa chỉ: ${
                addressDefault ? addressDefault : "Chưa có địa chỉ mặc định"
              }`}
            />
          </Form.Item>
          <Form.Item>
            <Link href="/smember/user-info/address-info">
              <Button htmlType="button" className="w-full" icon={<CiEdit />} />
            </Link>
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <Form.Item className="flex-1">
            <Link href="/smember/change-password">
              <Button htmlType="button" className="w-full">
                Đổi mật khẩu
              </Button>
            </Link>
          </Form.Item>
          <Form.Item>
            <div className="size-10" />
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <Form.Item className="flex-1">
            <Button type="primary" danger htmlType="submit" className="w-full">
              Cập nhật thông tin
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="size-10" />
          </Form.Item>
        </div>
      </Form>
    </Spin>
  );
}
