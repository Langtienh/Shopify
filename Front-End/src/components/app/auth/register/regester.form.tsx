"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import Link from "next/link";
import { register } from "@/services/auth";
import { useRouter } from "next/navigation";
import RenderIf from "@/components/global/renderif";
import { Button as MyButton } from "@/components/ui/button";
import { updateUserById } from "@/services/user/action";
import { useAuth } from "@/contexts/auth.context";

export default function RegesterForm({
  isCreateByAdmin,
  user,
}: {
  isCreateByAdmin?: boolean;
  user?: User;
}) {
  // khởi tạo giá trị mặc định
  const initialValues = {
    agreement: true,
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
  };

  const [form] = Form.useForm();
  // xử lý đăng kí
  const router = useRouter();
  const [isPending, setPending] = useState<boolean>(false);
  const auth = useAuth();
  const isDemo = !!auth.user?.roles.includes("demo");
  const onFinish = async (values: RegisterForm) => {
    setPending(true);
    try {
      if (isDemo && isCreateByAdmin) message.warning("Chỉ được phép xem");
      else {
        const res = user
          ? await updateUserById(user.id, values)
          : await register(values);
        message.success(res.message);
        if (isCreateByAdmin) router.push("/dashboard/users");
        else router.push("/login");
      }
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
        size="large"
        initialValues={initialValues}
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
        <RenderIf renderIf={!user}>
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
        </RenderIf>
        <RenderIf renderIf={!isCreateByAdmin}>
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
        </RenderIf>

        <Form.Item>
          <>
            <RenderIf renderIf={!isCreateByAdmin}>
              <Button
                type="primary"
                danger
                htmlType="submit"
                className="w-full"
              >
                Đăng kí
              </Button>
            </RenderIf>
            <RenderIf renderIf={isCreateByAdmin}>
              <div className="flex gap-5 justify-end">
                <Link href="/dashboard/users">
                  <MyButton
                    className="bg-gray-400 hover:bg-gray-400 hover:opacity-80"
                    type="button"
                  >
                    Cancel
                  </MyButton>
                </Link>
                <MyButton
                  className="bg-blue-600 hover:bg-blue-500"
                  type="submit"
                >
                  <RenderIf renderIf={user}>Update</RenderIf>
                  <RenderIf renderIf={!user}>Create user</RenderIf>
                </MyButton>
              </div>
            </RenderIf>
          </>
        </Form.Item>
        <RenderIf renderIf={!isCreateByAdmin}>
          <p className="text-center my-5">
            <span className="font-semibold text-sm text-gray-500">
              Đã có có tài khoản
            </span>{" "}
            <Link className="text-red-500 font-bold" href="/login">
              Đăng nhập
            </Link>
          </p>
        </RenderIf>
      </Form>
    </Spin>
  );
}
