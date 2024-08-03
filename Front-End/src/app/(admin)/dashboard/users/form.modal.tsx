"use client";
import React, { useState } from "react";
import { Checkbox, Form, Input, Spin } from "antd";
import { registerAction } from "@/app/(auth)/_lib/actions";
import { openNotification } from "@/lib/nofication";
import { useRouter } from "next/navigation";
import { DELAY } from "@/lib/ultils";
import { Address } from "@/app/(auth)/_components/register/selectAddress";
import { Button } from "@/components/ui/button";
export default function UserForm({
  user,
  show,
  close,
}: {
  user?: UserTypeCustom;
  show: boolean;
  close: () => void;
}) {
  const [form] = Form.useForm();
  // xử lý đăng kí
  const router = useRouter();
  const onFinish = async (values: any) => {
    setLoading(true);
    console.log(values);
    // const res = await registerAction(values);
    // if (res.status === 201) {
    //   openNotification({
    //     message: res.message || "Đăng kí thành công",
    //     description: "Đăng nhập để tiếp tục",
    //     notificationType: "success",
    //   });
    //   await DELAY(1000);

    //   router.push("/login");
    // } else {
    //   openNotification({
    //     message: res.message || "Đăng kí thất bại",
    //     description: "Tài khoản đã tồn tại hoặc không hợp lệ",
    //     notificationType: "error",
    //   });
    // }
    setLoading(false);
  };
  // const x = user?.address.split("-");
  const initialValues = {
    fullName: user?.fullName,
    isAdmin: user?.roles.includes("admin"),
    isDemo: user?.roles.includes("demo"),
    isUser: true,
    phone: user?.phone,
    email: user?.email,
    avatar: user?.avatar,
    // province: x ? x[0] : undefined,
    // district: x ? x[1] : undefined,
    // ward: x ? x[2] : undefined,
  };
  const [loading, setLoading] = useState<boolean>(false);
  if (show)
    return (
      <div className="fixed z-10 top-0 left-0 w-screen h-screen">
        <div
          onClick={close}
          className="absolute z-10 w-full h-full bg-black  opacity-40"
        />
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-[#0f172a] p-3 font-bold text-white text-center text-xl">
            {user ? "Chỉnh sửa" : "Thêm người dùng"}
          </div>
          <div className="p-3">
            <Spin spinning={loading}>
              <Form
                form={form}
                name="edit/add-user"
                onFinish={onFinish}
                scrollToFirstError
                size="large"
                initialValues={initialValues}
              >
                <div className="grid grid-cols-2 gap-x-5">
                  <Form.Item
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
                    <Input placeholder="Nhập tên" allowClear />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng điền số điện thoại!",
                      },
                    ]}
                  >
                    <Input
                      type="phone"
                      placeholder="Nhập số điện thoại"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item
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
                    <Input placeholder="Nhập email" allowClear />
                  </Form.Item>
                  <div className="w-full flex justify-between">
                    <Form.Item name="isAdmin" valuePropName="checked">
                      <Checkbox>admin</Checkbox>
                    </Form.Item>
                    <Form.Item name="isDemo" valuePropName="checked">
                      <Checkbox>demo</Checkbox>
                    </Form.Item>
                    <Form.Item name="isUser" valuePropName="checked">
                      <Checkbox disabled>user</Checkbox>
                    </Form.Item>
                  </div>
                </div>

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

                <Form.Item>
                  <Button type="submit" className="w-full text-base">
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    );
  return null;
}
