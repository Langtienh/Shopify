"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginWithCredentials } from "@/actions/next-auth.custom";
import { DELAY } from "@/lib/ultils";

const LoginForm: React.FC = () => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const router = useRouter();
  const onFinish = async (values: LoginDTO) => {
    setSpinning(true);
    const res = await loginWithCredentials(values);
    setSpinning(false);
    if (res) {
      await DELAY(2000);
      router.push("/");
    }
  };

  return (
    <>
      <Spin spinning={spinning} tip="Đang đăng nhập">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input
              type="phone"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ tài khoản</Checkbox>
              </Form.Item>

              <Link
                className="font-semibold text-sm text-gray-500"
                href="/login"
              >
                Quên mật khẩu
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full"
              danger
            >
              Đăng nhập
            </Button>
            <p className="text-center my-5">
              <span className="font-semibold text-sm text-gray-500">
                Bạn chưa có tài khoản?
              </span>{" "}
              <Link className="text-red-500 font-bold" href="/register">
                Đăng ký ngay
              </Link>
            </p>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default LoginForm;
