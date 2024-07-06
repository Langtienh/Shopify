"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { openNotification } from "@/lib/nofication";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth.action";
import { DELAY } from "@/utils/delay";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onFinish = async (values: LoginDTO) => {
    setLoading(true);
    const data = await loginAction(values);
    setLoading(false);
    if (data) {
      console.log(data);

      openNotification({
        message: "Đăng nhập thành công",
        description: "Vui lòng đợi trong giây lát",
        notificationType: "success",
      });
      await DELAY(2000);
      router.push("/");
    } else {
      openNotification({
        message: "Đăng nhập thất bại",
        description: "Tài khoản hoặc mật khẩu không chính xác",
        notificationType: "error",
      });
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size="large"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
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

          <Link className="font-semibold text-sm text-gray-500" href="/login">
            Quên mật khẩu
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
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
  );
};

export default LoginForm;
