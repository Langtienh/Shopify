"use client";

import { IUser } from "@/auth/next-auth";
import { Checkbox } from "antd";
import { Address } from "./address";
import React from "react";
import { Form, Input } from "antd";
import { useAppDispatch } from "@/redux/store";
import { changeUserInfo } from "@/redux/cart/slice";
import { useRouter } from "next/navigation";

type TProps = {
  user: IUser;
};

type formField = {
  addressDetail: string;
  districtCode: string;
  email: string;
  fullName: string;
  phone: string;
  provinceCode: string;
  wardCode: string;
};
export default function UserInfo({ user }: TProps) {
  const [form] = Form.useForm();
  const dispath = useAppDispatch();
  const router = useRouter();
  const onFinish = async (values: formField) => {
    dispath(
      changeUserInfo({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.addressDetail + ", " + values.wardCode,
      })
    );
    router.push("/cart/payment");
  };
  const initialValues = {
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
  };
  return (
    <Form
      initialValues={initialValues}
      form={form}
      name="userInfo"
      onFinish={onFinish}
      scrollToFirstError
      size="large"
    >
      <div className="text-base">
        <h2 className="uppercase mb-[10px]">Thông tin khách hàng</h2>
        <div className="px-4 py-4 border rounded-lg shadow-md bg-white mb-7">
          <div className="flex items-center justify-between">
            <div>
              <span className="capitalize">{user.fullName}</span>{" "}
              <span className="text-[12px] ml-2 py-1 px-2 border rounded-xl border-red-600 text-red-600">
                Smember
              </span>
            </div>
            <p className="text-sm text-gray-400">{user.phone}</p>
          </div>
          <div className="pt-5 -mb-6">
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Sai định dạnh ví dụ user@gmail.com",
                },
                {
                  required: true,
                  message: "Vui lòng điền email hoặc gmail!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Email"
                className="w-full border-0 pt-2 outline-none border-b"
              />
            </Form.Item>
          </div>
          <p className="text-[10.5px] text-gray-400 py-2">
            (*) Hóa đơn VAT sẽ được gửi qua email này
          </p>
          <div className="pt-3">
            <Checkbox>Nhận email thông báo và ưu đãi từ Shopify</Checkbox>
          </div>
        </div>
        <h2 className="uppercase mb-[10px]">Thông tin nhận hàng</h2>
        <div className="bg-white p-4 rounded-lg border shadow-lg grid grid-cols-2 gap-x-3">
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
            <Input placeholder="Tên người nhận" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Vui lòng điền số điện thoại!" },
            ]}
          >
            <Input type="phone" placeholder="Số điện thoại người nhận" />
          </Form.Item>
          <Address />
          <Form.Item
            name="addressDetail"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input placeholder="Số nhà, tên đường" />
          </Form.Item>
          <input
            type="text"
            placeholder="Ghi chú khác(nếu có)"
            className="w-full col-span-2 outline-none py-2 border-b"
          />
        </div>
        <button
          id="submitPaymentInfo"
          type="submit"
          className="w-full hidden"
        />
      </div>
    </Form>
  );
}
