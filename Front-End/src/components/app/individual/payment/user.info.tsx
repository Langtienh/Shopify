"use client";

import { Button, Checkbox, FormProps, Radio, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import AddressForm from "@/components/global/address/form";
import RenderIf from "@/components/global/renderif";
import { MdNavigateNext } from "react-icons/md";
import { useCheckout } from "@/contexts/checkout.context";

type TProps = {
  user: User;
  checkout: string;
  addresses: (Address & { path: string | undefined })[];
};

type FieldType = {
  detail: string;
  email: string;
  fullName: string;
  phone: string;
  districtCode: string;
  provinceCode: string;
  wardCode: string;
};

export default function UserInfo({ user, checkout, addresses }: TProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isEditAddress, setEditAddress] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");
  const { updateUserInfo } = useCheckout();
  useEffect(() => {
    if (!addresses.length) setEditAddress(true);
    else {
      const _default =
        addresses.find((address) => address.default) || addresses[0];
      setPath(`${_default.detail}, ${_default.code}`);
    }
  }, [addresses]);

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    let address = "";
    if (values.wardCode && values.detail)
      address = values.detail + ", " + values.wardCode;
    else address = path;
    const _address = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      address,
    };

    updateUserInfo(_address);
    router.push(`/cart/payment?checkout=${checkout}`);
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
      onFinish={handleSubmit}
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

          <RenderIf renderIf={isEditAddress}>
            <AddressForm />
          </RenderIf>

          <RenderIf renderIf={!isEditAddress}>
            <Form.Item className="col-span-2">
              <Radio.Group
                value={path}
                onChange={(e) => setPath(e.target.value)}
              >
                {addresses.map((address) => (
                  <Radio
                    key={`${address.detail}, ${address.code}`}
                    value={`${address.detail}, ${address.code}`}
                  >
                    <div className="mb-4">
                      <p>
                        <b className="font-bold pr-5">{address.name}</b>
                        <RenderIf renderIf={address.default}>
                          <Tag color="red">Mặc định</Tag>
                        </RenderIf>
                      </p>
                      <p className="text-sm text-gray-500">{`${address.detail}, ${address.path}`}</p>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </RenderIf>

          <Form.Item className="col-span-2 flex justify-end">
            <Button
              onClick={() => setEditAddress((preState) => !preState)}
              htmlType="button"
              type="text"
              danger
              iconPosition="end"
              icon={<MdNavigateNext size={16} />}
            >
              <RenderIf renderIf={isEditAddress}>Chọn từ Sổ địa chỉ</RenderIf>
              <RenderIf renderIf={!isEditAddress}>Nhập địa chỉ mới</RenderIf>
            </Button>
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
