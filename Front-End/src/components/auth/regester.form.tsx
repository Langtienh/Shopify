"use client";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import Link from "next/link";
import {
  getDistrictByParentCode,
  getWardByParentCode,
  getProvinceAll,
} from "@/actions/vnAPI.services";
import { registerAction } from "@/actions/auth.action";
import { openNotification } from "@/lib/nofication";
import { useRouter } from "next/navigation";
import { DELAY } from "@/lib/ultils";

const { Option } = Select;

const RegesterForm: React.FC = () => {
  // module address
  // todo fix bug chọn lại tỉnh nhưng huyện không reset
  const [provinces, setProvinces] = useState<provinceType[]>([]);
  const [provinceCode, setProvinceCode] = useState<string>("");
  useEffect(() => {
    const fetchProvince = async () => {
      const data = await getProvinceAll();
      setProvinces(data);
    };
    fetchProvince();
  }, []);
  const [districts, setDistricts] = useState<districtType[]>([]);
  const [districtCode, setDistrictCode] = useState<string | null>("");
  useEffect(() => {
    const fetchDistricts = async () => {
      const data = await getDistrictByParentCode(provinceCode);
      setDistricts(data);
    };
    if (!!provinceCode) fetchDistricts();
  }, [provinceCode]);

  const [ward, setWard] = useState<wardType[]>([]);
  useEffect(() => {
    const fetchWard = async () => {
      if (districtCode) {
        const data = await getWardByParentCode(districtCode);
        setWard(data);
      }
    };
    if (!!districtCode) fetchWard();
  }, [districtCode]);
  const [form] = Form.useForm();
  // xử lý đăng kí
  const router = useRouter();
  const onFinish = async (values: RegisterForm) => {
    setLoading(true);
    const data = await registerAction(values);
    setLoading(false);
    if (data) {
      openNotification({
        message: "Đăng kí thành công",
        description: "Đăng nhập để tiếp tục",
        notificationType: "success",
      });
      await DELAY(1000);
      router.push("/login");
    } else {
      openNotification({
        message: "Đăng kí thất bại",
        description: "Tài khoản đã tồn tại hoặc không hợp lệ",
        notificationType: "error",
      });
    }
  };
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
        size="large"
      >
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

        <div className="grid grid-cols-3 gap-3">
          <Form.Item
            name="province"
            rules={[
              { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
            ]}
          >
            <Select
              onChange={(v) => setProvinceCode(v)}
              placeholder="Tỉnh/Thành phố"
            >
              {!!provinces.length &&
                provinces.map((item) => (
                  <Option key={item.code} value={item.code}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="district"
            rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện" }]}
          >
            <Select
              onChange={(v) => setDistrictCode(v)}
              placeholder="Quận/Huyện"
            >
              {!!provinceCode &&
                districts.map((item) => (
                  <Option key={item.code} value={item.code}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="ward"
            rules={[{ required: true, message: "Vui lòng chọn Phường/Xã" }]}
          >
            <Select placeholder="Phường/Xã">
              {!!districtCode &&
                ward.map((item) => (
                  <Option key={item.code} value={item.code}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </div>

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
                  new Error("The new password that you entered do not match!")
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
          <Button
            loading={loading}
            type="primary"
            danger
            htmlType="submit"
            className="w-full"
          >
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
    </>
  );
};

export default RegesterForm;
